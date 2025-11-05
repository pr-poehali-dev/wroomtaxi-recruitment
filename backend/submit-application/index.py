import json
import os
import psycopg2
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
        document_url = body_data.get('documentUrl', '')
        
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
            "INSERT INTO driver_applications (first_name, last_name, middle_name, phone, email, age, has_own_car, document_url) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (first_name, last_name, middle_name or None, phone, email, int(age), has_own_car, document_url or None)
        )
        
        application_id = cursor.fetchone()[0]
        conn.commit()
        
        cursor.close()
        conn.close()
        
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
