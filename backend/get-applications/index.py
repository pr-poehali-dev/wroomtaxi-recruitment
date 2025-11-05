import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all driver applications from database
    Args: event - dict with httpMethod, queryStringParameters
          context - object with request_id attribute
    Returns: HTTP response dict with list of applications
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        database_url = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        query_params = event.get('queryStringParameters', {}) or {}
        status_filter = query_params.get('status', '')
        
        if status_filter:
            cursor.execute(
                "SELECT id, first_name, last_name, middle_name, phone, email, age, has_own_car, document_url, created_at, status "
                "FROM driver_applications WHERE status = %s ORDER BY created_at DESC",
                (status_filter,)
            )
        else:
            cursor.execute(
                "SELECT id, first_name, last_name, middle_name, phone, email, age, has_own_car, document_url, created_at, status "
                "FROM driver_applications ORDER BY created_at DESC"
            )
        
        rows = cursor.fetchall()
        
        applications = []
        for row in rows:
            applications.append({
                'id': row[0],
                'firstName': row[1],
                'lastName': row[2],
                'middleName': row[3],
                'phone': row[4],
                'email': row[5],
                'age': row[6],
                'hasOwnCar': row[7],
                'documentUrl': row[8],
                'createdAt': row[9].isoformat() if row[9] else None,
                'status': row[10]
            })
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'applications': applications,
                'total': len(applications)
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
