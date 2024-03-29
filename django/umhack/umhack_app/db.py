import os
from dotenv import load_dotenv
from supabase import create_client, Client
import psycopg2
from datetime import datetime

load_dotenv()
# "SELECT SUM(WITHDRAWAL_AMT) AS TOTAL_EXPENSES FROM \"Transaction\" WHERE WITHDRAWAL_AMT IS NOT NULL"

def execute_query(sql_query: str = None):
    try:
        conn = psycopg2.connect(os.environ.get("DATABASE_URL"))
        cur = conn.cursor()
        cur.execute(sql_query)
        result = cur.fetchall()
        print(result)
        cur.close()
        conn.close()
        
        # Check if the result is not None and if it contains a datetime object.
        if result is not None:
            # Convert all elements of the tuple to string.
            final_result = tuple(
                element.strftime('%Y-%m-%d %H:%M:%S') if isinstance(element, datetime) else str(element)
                for element in result
            )
        else:
            final_result = "Query did not return any results."
    
        return "SQL Query result:", ' '.join(final_result)
    
    except Exception as e:
        cur.close()
        conn.close()
        return "Error executing query:", str(e), " Try another query"