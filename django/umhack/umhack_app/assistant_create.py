import openai
from dotenv import load_dotenv
import os

def create_assistant():
    load_dotenv()

    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    # predefined assistant details
    # !! this data is outdated !!
    model: str = "gpt-3.5-turbo-0125"
    assistant_name = "Finance Assistant"
    assistant_instruction = "As a Finance Assistant, your task is to analyze the user's financial transaction history outlined in the provided CSV file. The CSV file's structure encompasses the following columns: DATE, TRANSACTION_DETAILS, DESCRIPTION, CATEGORY, PAYMENT_METHOD, WITHDRAWAL_AMT, DEPOSIT_AMT. Analyze this data to respond accurately to user queries. For all calculations, you must utilize a code interpreter to guarantee the precision of the results."
    assistant_tools = [{"type": "code_interpreter"}, {
        "type": "function",
        "function":{    
            "name": "get_data",
            "description": "Retrieve specific financial data from the user's finance database using SQL queries. This function fetches only the essential data needed for calculations or to answer the user's queries accurately.", 
            "parameters": {
                "type": "object",
                "properties": {
                    "sql_query": {
                        "type": "string",
                        "description": "SQL query to get the data from the user finance database ie 'SELECT SUM(WITHDRAWAL_AMT) FROM \"Transaction\" WHERE DATE BETWEEN '2021-01-01' AND '2021-12-31' AND CATEGORY='Grocery' AND PAYMENT_METHOD='Credit Card'"
                    },
                    "userId": {
                        "type": "string",
                        "description": "User ID of the user whose data is to be fetched from the database"
                    }
                },
                "required": ["sql_query", "userId"]
            }   
        }
    }]


    assistant = client.beta.assistants.create(name=assistant_name, instructions=assistant_instruction, tools=assistant_tools, model=model)
    
    return assistant


print(create_assistant())