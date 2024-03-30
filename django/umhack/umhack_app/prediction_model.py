from venv import create
import openai
import time 
import json
from dotenv import load_dotenv
import os
import json

from .generate_plot import generate_plot
from .db import execute_query, fetch_and_upload


load_dotenv()

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

assistant = client.beta.assistants.retrieve(assistant_id="asst_xxwe6WGK6f8ny0YbdCK19FTP")

def upload_file():
    fetch_and_upload()

    file_obj = client.files.create(
    file=open("./data.csv", "rb"),
    purpose="assistants"
    )

    my_updated_assistant = client.beta.assistants.update(
    "asst_xxwe6WGK6f8ny0YbdCK19FTP",
    instructions="You will perform operation on data in csv file.Always use ARIMA for forecasting purposes. Use forecast_visualisation instead of data_visualisation when it involves predicting future data. You should always show visualisation in the end. If data is insufficient for prediction due to small amount of data, just proceed with prediction and ignore low accuracy. Always have minimal to none explanation on your steps. Always show visualisation using function calling in the end. Include only monthy or weekly data for prediction. When visualising, use code_interpreter to pass the necessary data to data_visualisation.",
    name="Prediction Model",
    tools=[{"type": "code_interpreter"},
            {"type": "function",
            "function":{
                    "name": "data_visualisation",
                    "description": "Visualise data into graphs when necessary to observe the data trend. Use this function when no prediction is involved. Use forecast_visualisation instead of data_visualisation when it involves predicting future data. Use code_interpreter to pass the necessary data to data_visualisation.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                        "type": {
                            "type": "string",
                            "description": "Type of graph to be plotted ie 'bar', 'line', 'pie'",
                            "enum": ["bar","line","pie"]
                        },
                        "data": {
                            "type": "object",
                            "properties": {
                            "x": {
                                "type": "array",
                                "description": "X-axis data representing the categories or intervals",
                                "items": {
                                    "type": "string"
                                }
                            },
                            "y": {
                                "type": "array",
                                "description": "Y-axis data representing the values corresponding to each category or interval on the X-axis",
                                "items": {
                                    "type": "number"
                                }
                            }
                            },
                            "required": ["x","y"]
                        }
                        },
                        "required": ["type","data"]
                    }
                }
            },
            {"type": "function",
                "function":{
                    "name": "forecast_visualisation",
                    "description": "Visualise forecasted data into two-line-graph when necessary to observe the data trend. ONLY USE THIS FUNCTION WHEN INVOLVES PREDICTING FUTURE DATA.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                        "type": {
                            "type": "string",
                            "description": "Type of graph to be plotted ie 'forecast'",
                            "enum": ["forecast"]
                        },
                        "actual_data": {
                            "type": "object",
                            "properties": {
                            "x": {
                                "type": "array",
                                "description": "X-axis of the actual data(current data used for prediction) representing the categories or intervals in appropriate format like months or weeks. KEEP THE ARRAY TO LESS THAN 3 ELEMENTS ONLY",
                                "items": {
                                    "type": "string"
                                }
                            },
                            "y": {
                                "type": "array",
                                "description": "Y-axis of the actual data(current data used for prediction) representing the values corresponding to each category or interval on the X-axis",
                                "items": {
                                    "type": "number"
                                }
                            }
                            },
                            "required": ["x","y"]
                        },
                        "forecast_data": {
                            "type": "object",
                            "properties": {
                            "x": {
                                "type": "array",
                                "description": "X-axis for the forcasted data(result for prediction) representing the categories or intervals in appropriate format like months or weeks. KEEP THE ARRAY TO LESS THAN 2 ELEMENTS ONLY",
                                "items": {
                                    "type": "string"
                                }
                            },
                            "y": {
                                "type": "array",
                                "description": "Y-axis for the forcasted data representing the values corresponding to each category or interval on the X-axis",
                                "items": {
                                    "type": "number"
                                }
                            }
                            },
                            "required": ["x","y"]
                        }
                        },
                        "required": ["type","actual_data","forecast_data"]
                    }
                }
            },
            {"type": "function",
                "function":{
                    "name": "get_data",
                    "description": "Get data from user finance database through performng SQL query and return the result. Get only the necessary data required to perform calculation/to answer the user's questions. Table name is \"Transaction\" ",
                    "parameters": {
                        "type": "object",
                        "properties": {
                        "sql_query": {
                            "type": "string",
                            "description": "SQL query to get the data from the user finance database. COLUMN HEAD: DATE, TRANSACTION_DETAILS, DESCRIPTION, CATEGORY, PAYMENT_METHOD, WITHDRAWAL_AMT, DEPOSIT_AMT. For specific activity, search in DESCRIPTION with ILIKE '%KEYWORD%'. Currency unit is RM. Be more broad on the searching to include more activities. Date format: timestamp"
                        }
                        },
                        "required": ["sql_query"]
                    }
                }
            }],
        model="gpt-4-0125-preview",
        file_ids=[file_obj.id],
    )


data_visualisation_response = None
forecast_visualisation_response = None

def data_visualisation(type, data):
    global data_visualisation_response
    data_visualisation_response = [type, data]
    return "success"

# def forecast(type, data, steps, freq):
#     global forecast_visualisation_response
#     run_gen_plot = generate_plot({"type": type, "data":data, "steps":steps, "freq":freq})
#     forecast_visualisation_response = run_gen_plot
#     return forecast_visualisation_response
def forecast(data):
    global forecast_visualisation_response
    forecast_visualisation_response = generate_plot(data)
    return forecast_visualisation_response
    # return "success"

def reset_global_responses():
    global data_visualisation_response, forecast_visualisation_response
    data_visualisation_response = None
    forecast_visualisation_response = None

def get_data(sql_query):
    # return f"Data fetched with query {sql_query}"
    print(f"SQL_QUERY::: {sql_query}")
    print(f"SQL_QUERY::: {sql_query}")
    print(f"SQL_QUERY::: {sql_query}")
    # Assuming execute_query returns a list of dictionaries
    query_result = execute_query(sql_query)
    
    # Convert the result into a JSON string
    result_string = json.dumps(query_result)
    
    return result_string

class PredictionModelClass:
    thread_id = None

    def __init__(self):
        self.client = client
        self.assistant = assistant
        self.thread = None
        self.run = None
        self.create_thread()
        # upload_file()
        global data_visualisation_response
        data_visualisation_response = None
        global forecast_visualisation_response
        forecast_visualisation_response = None

    def create_thread(self):
        if not self.thread:
            thread_obj = self.client.beta.threads.create()
            self.thread_id = thread_obj.id
            self.thread = thread_obj
            print(f"ThreadID::: {self.thread.id}")

    def add_message_to_thread(self, role, content):
        if self.thread:
            self.client.beta.threads.messages.create(
                thread_id=self.thread.id, role=role, content=content
            )

    def run_assistant(self, instructions):
        if self.thread and self.assistant:
            self.run = self.client.beta.threads.runs.create(
                thread_id=self.thread.id,
                assistant_id=self.assistant.id,
                instructions=instructions,
            )
            
    def process_message(self):
        if self.thread:
            messages = self.client.beta.threads.messages.list(thread_id=self.thread.id)
            
            # for message in messages.data:
            #     print(message.role, ' > ', message.content[0].__dict__.get('text').__dict__.get('value'))
            
            try:
                return messages.data[0].content[0].__dict__.get('text').__dict__.get('value')
            except:
                return messages.data[0].content[0].text.value
                
    def retrieve_messages(self):
        if self.thread:
            messages = self.client.beta.threads.messages.list(thread_id=self.thread.id)
            msg_list = []
            
            for message in messages.data:
                role = message.role
                msg = message.content[0].__dict__.get('text').__dict__.get('value')
                msg_list.append([role, msg])
                
            return msg_list

    def call_required_functions(self, required_actions):
        if not self.run:
            return
        tool_outputs = []
        
        if self.thread:
            for action in required_actions["tool_calls"]:
                func_name = action["function"]["name"]
                arguments = json.loads(action["function"]["arguments"])

                if func_name == "data_visualisation":
                    print(f"EXECUTING FUNCTION:: {func_name} with arguments:: {arguments}")
                    output = data_visualisation(type=arguments["type"], data=arguments["data"])
                    tool_outputs.append({"tool_call_id": action["id"], "output": output})
                elif func_name == "forecast":
                    print(f"EXECUTING FUNCTION:: {func_name} with arguments:: {arguments}")
                    
                    output = forecast(arguments)
                    tool_outputs.append({"tool_call_id": action["id"], "output": "visualisation done"})
                elif func_name == "get_data":
                    print(f"EXECUTING FUNCTION:: {func_name} with arguments:: {arguments}")
                    output = get_data(sql_query=arguments["sql_query"])
                    tool_outputs.append({"tool_call_id": action["id"], "output": output})
                else:
                    raise ValueError(f"Unknown function: {func_name}")

            print("Submitting outputs back to the Assistant...")
            self.client.beta.threads.runs.submit_tool_outputs(
                thread_id=self.thread.id, run_id=self.run.id, tool_outputs=tool_outputs
            )
            
    def wait_for_completion(self):
        if self.thread and self.run:
            while True:
                # time.sleep(5)
                run_status = self.client.beta.threads.runs.retrieve(
                    thread_id=self.thread.id, run_id=self.run.id
                )
                # print(f"RUN STATUS:: {run_status.model_dump_json(indent=4)}")

                if run_status.status == "completed":
                    return self.process_message()
                    break
                elif run_status.status == "requires_action" and run_status.required_action:
                    print("FUNCTION CALLING NOW...")
                    self.call_required_functions(
                        required_actions=run_status.required_action.submit_tool_outputs.model_dump()
                    )

    # Run the steps
    def run_steps(self):
        if self.thread and self.run:
            run_steps = self.client.beta.threads.runs.steps.list(
                thread_id=self.thread.id, run_id=self.run.id
            )
            print(f"Run-Steps::: {run_steps}")
            return run_steps.data
        
def run_model(prompt):
    reset_global_responses()
    
    model = PredictionModelClass()
    model.add_message_to_thread('user', prompt)
    model.run_assistant("Predict using ARIMA model and provide visualisation. Use forecast_visualisation instead of data_visualisation when it involves predicting future data.")
    model.wait_for_completion()
    
    # Capture and reset the responses after operation
    temp_data_visualisation_response = data_visualisation_response
    temp_forecast_visualisation_response = forecast_visualisation_response
    reset_global_responses()  # Ensure they're reset for the next call
    print('----------------------------------------------------------------')
    print('----------------------------------------------------------------')
    print('----------------------------------------------------------------')
    print('----------------------------------------------------------------')
    print(f"DATA_VISUALISATION_RESPONSE::: {temp_forecast_visualisation_response}")
    return {"message":"Success", "data_visualisation_response":temp_data_visualisation_response, "forecast_visualisation_response":temp_forecast_visualisation_response}
    # model.run_steps() # print run steps for debugging
    