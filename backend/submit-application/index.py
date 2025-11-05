import json
import os
import psycopg2
import urllib.request
import urllib.parse
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Save driver application to database
    Args: event - dict with httpMethod, body, headers
          context - object with request_id attribute
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        first_name = body_data.get('firstName', '').strip()
        last_name = body_data.get('lastName', '').strip()
        middle_name = body_data.get('middleName', '').strip()
        phone = body_data.get('phone', '').strip()
        email = body_data.get('email', '').strip()
        age = body_data.get('age')
        has_own_car = body_data.get('hasOwnCar') == 'yes'
        license_front_url = body_data.get('licenseFrontUrl', '')
        license_back_url = body_data.get('licenseBackUrl', '')
        
        if not all([first_name, last_name, phone, email, age]):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Missing required fields'})
            }
        
        database_url = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        cursor.execute(
            "INSERT INTO driver_applications (first_name, last_name, middle_name, phone, email, age, has_own_car, license_front_url, license_back_url) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (first_name, last_name, middle_name or None, phone, email, int(age), has_own_car, license_front_url or None, license_back_url or None)
        )
        
        application_id = cursor.fetchone()[0]
        conn.commit()
        
        cursor.close()
        conn.close()
        
        # Send notification to Telegram
        try:
            telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
            telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
            
            if telegram_token and telegram_chat_id:
                car_status = "✅ Есть своя машина" if has_own_car else "❌ Нет своей машины"
                
                message = f"""🚖 <b>Новая заявка водителя #{application_id}</b>

👤 <b>Имя:</b> {first_name} {middle_name} {last_name}
📞 <b>Телефон:</b> {phone}
✉️ <b>Email:</b> {email}
🎂 <b>Возраст:</b> {age} лет
🚗 <b>Машина:</b> {car_status}
"""
                
                telegram_url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
                data = urllib.parse.urlencode({
                    'chat_id': telegram_chat_id,
                    'text': message,
                    'parse_mode': 'HTML'
                }).encode('utf-8')
                
                req = urllib.request.Request(telegram_url, data=data)
                urllib.request.urlopen(req)
                
                # Send license photos
                if license_front_url:
                    photo_url = f"https://api.telegram.org/bot{telegram_token}/sendPhoto"
                    photo_data = urllib.parse.urlencode({
                        'chat_id': telegram_chat_id,
                        'photo': license_front_url,
                        'caption': '📄 Водительские права (лицевая сторона)'
                    }).encode('utf-8')
                    photo_req = urllib.request.Request(photo_url, data=photo_data)
                    urllib.request.urlopen(photo_req)
                
                if license_back_url:
                    photo_url = f"https://api.telegram.org/bot{telegram_token}/sendPhoto"
                    photo_data = urllib.parse.urlencode({
                        'chat_id': telegram_chat_id,
                        'photo': license_back_url,
                        'caption': '📄 Водительские права (обратная сторона)'
                    }).encode('utf-8')
                    photo_req = urllib.request.Request(photo_url, data=photo_data)
                    urllib.request.urlopen(photo_req)
        except Exception as telegram_error:
            pass
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'applicationId': application_id,
                'message': 'Application submitted successfully'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }