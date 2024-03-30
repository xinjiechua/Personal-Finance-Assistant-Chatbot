import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

def generate_plot(data):
  
    if data["freq"] == "month":
        freq = 'M'
        model = ARIMA(data["data"]["y"], order=(6, 0, 3))  
        model_fit = model.fit()

        forecast = model_fit.forecast(steps=int(data["steps"]))  
        forecast_index = pd.date_range(start=pd.to_datetime(data["data"]["x"][-1]), periods=int(data["steps"]) + 1, freq=freq)[1:]

        actual_data = {"x": data["data"]["x"], "y": data["data"]["y"]}
        forecast_data = {"x": forecast_index.strftime('%Y-%m').tolist(), "y": forecast.tolist()}
        

        json_data = {
            "type": "forecast",
            "data": {
                "actualdata": actual_data,
                "forecastdata": forecast_data
            }
        }

        print(json_data)
        return (json_data)
           
    elif data["freq"] == "week":
        freq = 'W-Mon'
        model = ARIMA(data["data"]["y"], order=(6, 0, 3))  
        model_fit = model.fit()

        forecast = model_fit.forecast(steps=int(data["steps"]))  
        forecast = [max(0, value) for value in forecast]
        forecast_index = pd.date_range(start=pd.to_datetime(data["data"]["x"][-1]), periods=int(data["steps"]), freq=freq)

        actual_data = {"x":[date[5:] for date in data["data"]["x"]], "y": data["data"]["y"]}
        forecast_data = {"x": forecast_index.strftime('%m-%d').tolist(),"y": [round(value, 2) for value in forecast]}

        json_data = {
            "type": "forecast",
            "data": {
                "actualdata": actual_data,
                "forecastdata": forecast_data
            }
        }
        print(json_data)
        return (json_data)

# generate_plot(data)