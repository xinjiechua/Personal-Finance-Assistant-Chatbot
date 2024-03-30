import os
from dotenv import load_dotenv
from supabase import create_client, Client
import psycopg2
from datetime import datetime
import pandas as pd

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
    
def fetch_and_upload():
    """
    Fetch all data from the 'Transaction' table and save selected columns as a CSV file locally.
    Selected columns are 1, 2, 4, 6, and 7, considering column indexing starts at 0.
    The first column (index 0) is excluded.
    """
    try:
        # Connect to the database
        conn = psycopg2.connect(os.environ.get("DATABASE_URL"))
        cur = conn.cursor()
        
        # Construct and execute the fetch query
        fetch_query = "SELECT * FROM Transaction"
        cur.execute(fetch_query)
        
        # Fetch the column names and select specific columns excluding the first column
        columns = [desc[0] for desc in cur.description]
        selected_columns_indexes = [1, 2, 4, 6, 7]  # Specify the columns to keep, excluding the first
        columns = [columns[i] for i in selected_columns_indexes]  # Select specific column names
        
        # Fetch all rows and select specific columns based on the indexes
        data = cur.fetchall()
        data = [[row[i] for i in selected_columns_indexes] for row in data]
        
        # Convert the data to a DataFrame with the selected columns
        df = pd.DataFrame(data, columns=columns)
        
        local_file_path = "data.csv"
        if os.path.exists(local_file_path):
            os.remove(local_file_path)
        # Export to CSV
        df.to_csv(local_file_path, index=False)
        print(f"Data exported successfully to {local_file_path}")
        
    except Exception as e:
        print("Error fetching data or saving to CSV:", str(e))
    
    finally:
        # Clean up: close cursor and connection
        if cur:
            cur.close()
        if conn:
            conn.close()

# Example usage
# fetch_and_upload(table_name="YourTableName", local_file_path="path/to/your/local/folder/filename.csv")
# temp = execute_query("SELECT CATEGORY, SUM(WITHDRAWAL_AMT) AS TOTAL_EXPENSES FROM Transaction WHERE CATEGORY IN ('Lifestyle Purchases', 'Childcare', 'Education', 'Insurance') GROUP BY CATEGORY'")
# print(temp)

