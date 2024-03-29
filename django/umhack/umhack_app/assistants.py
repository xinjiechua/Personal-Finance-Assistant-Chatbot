from venv import create
from django.http import JsonResponse
import openai
import time 
import json
from dotenv import load_dotenv
import os
from django.shortcuts import render
from django.http import HttpResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .db import execute_query
from .prediction_model import run_model


load_dotenv()

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# will be using same assistant for all users, so to create assistant, will use openai playground directly or use assistant_create.py
# assistant = client.beta.assistants.create(name=assistant_name, instructions=assistant_instruction, tools=assistant_tools, model=model)
assistant = client.beta.assistants.retrieve(assistant_id="asst_IbFqFruhOkr9PRMPpxbi5f06")

# functions to be called
def get_data(sql_query, userId):
    # return f"Data fetched for user {userId} with query {sql_query}"
    print(f"SQL_QUERY::: {sql_query}")
    print(f"SQL_QUERY::: {sql_query}")
    print(f"SQL_QUERY::: {sql_query}")
    # Assuming execute_query returns a list of dictionaries
    query_result = execute_query(sql_query)
    
    # Convert the result into a JSON string
    result_string = json.dumps(query_result)
    
    return result_string

def visualisation_and_prediction(prompt):
    response = run_model(prompt)
    print(f"RESPONSE::: {response}")
    return 'Success'
    

class AssistantManager:
    thread_id = None
    
    def __init__(self, thread_id):
        self.client = client
        self.assistant = assistant
        self.thread = None
        self.run = None
        self.summary = None
        print(f"ThreadID::: {thread_id}")
        
        if thread_id is None:
            # Logic to create a new thread if one doesn't exist
            print('Creating new thread')
            self.create_thread()
        else:
            # Retrieve existing thread using the stored thread_id
            self.thread = client.beta.threads.retrieve(thread_id=thread_id)

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
            
            for message in messages.data:
                print(message.role, ' > ', message.content[0].__dict__.get('text').__dict__.get('value'))
            
            return messages.data[0].content[0].__dict__.get('text').__dict__.get('value')
                
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

                if func_name == "get_data":
                    print(f"EXECUTING FUNCTION:: {func_name} with arguments:: {arguments}")
                    output = get_data(sql_query=arguments["sql_query"], userId=arguments["userId"])
                    print(f"OUTPUT:: {output}")

                    tool_outputs.append({"tool_call_id": action["id"], "output": output})
                    
                elif func_name == "visualisation_and_prediction":
                    print(f"EXECUTING FUNCTION:: {func_name} with arguments:: {arguments}")
                    output = visualisation_and_prediction(prompt=arguments["prompt"])
                    tool_outputs.append({"tool_call_id": action["id"], "output": "visualisation done"})
                else:
                    raise ValueError(f"Unknown function: {func_name}")

            print("Submitting outputs back to the Assistant...")
            self.client.beta.threads.runs.submit_tool_outputs(
                thread_id=self.thread.id, run_id=self.run.id, tool_outputs=tool_outputs
            )
            
    def wait_for_completion(self):
        if self.thread and self.run:
            while True:
                time.sleep(5)
                run_status = self.client.beta.threads.runs.retrieve(
                    thread_id=self.thread.id, run_id=self.run.id
                )
                # print(f"RUN STATUS:: {run_status.model_dump_json(indent=4)}")

                if run_status.status == "completed":
                    # FINAL RETURN HERE
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
