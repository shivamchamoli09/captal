import numpy as np
import pandas as pd
import datetime as dt
import yfinance as yf

from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, LSTM

def predict_next_day_price(company):
    try:
        print("Starting prediction for ", company)
        # Data preparation
        start_train = dt.datetime(2018, 1, 1)
        end_train = dt.datetime.now()
        data = yf.download(company, start=start_train, end=end_train)

        if data.empty:
            return {"error": "No data retrieved for the specified company."}

        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_data = scaler.fit_transform(data['Close'].values.reshape(-1, 1))

        prediction_days = 100
        x_train = []
        y_train = []

        for x in range(prediction_days, len(scaled_data)):
            x_train.append(scaled_data[x - prediction_days:x, 0])
            y_train.append(scaled_data[x, 0])

        x_train, y_train = np.array(x_train), np.array(y_train)
        x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

        # Build LSTM Model
        model = Sequential()
        model.add(LSTM(units=50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
        model.add(Dropout(0.2))
        model.add(LSTM(units=50, return_sequences=True))
        model.add(Dropout(0.2))
        model.add(LSTM(units=50))
        model.add(Dropout(0.2))
        model.add(Dense(units=1))  # Prediction for the next price

        model.compile(optimizer="adam", loss="mean_squared_error")
        model.fit(x_train, y_train, epochs=25, batch_size=32)

        # # Test on the recent data
        # start_test = dt.datetime(2018, 1, 1)
        # end_test = dt.datetime.now()
        # test_data = yf.download(company, start=start_test, end=end_test)
        actual_prices = data['Close'].values

        if data.empty:
            return {"error": "No data retrieved for the specified company."}

        total_dataset = pd.concat((data['Close'], data['Close']), axis=0)

        model_inputs = total_dataset[len(total_dataset) - len(data) - prediction_days:].values
        model_inputs = model_inputs.reshape(-1, 1)
        model_inputs = scaler.transform(model_inputs)

        # Prepare the data for prediction
        real_data = [model_inputs[-prediction_days:]]
        real_data = np.array(real_data)
        real_data = np.reshape(real_data, (real_data.shape[0], real_data.shape[1], 1))

        # Predict tomorrow's price
        prediction = model.predict(real_data)
        prediction = scaler.inverse_transform(prediction)

        # Today's price
        today_price = actual_prices[-1] if len(actual_prices) > 0 else None

        # Calculate tomorrow's date, accounting for weekends
        today_date = dt.date.today()
        if today_date.weekday() == 4:  # Friday
            tomorrow_date = today_date + dt.timedelta(days=3)  # Monday
        elif today_date.weekday() == 5:  # Saturday
            tomorrow_date = today_date + dt.timedelta(days=2)  # Monday
        else:
            tomorrow_date = today_date + dt.timedelta(days=1)

        return {
            "assetName": company,
            "currentPrice": today_price[0],
            "currentDate": today_date.strftime("%Y-%m-%d"),
            "estimatedPrice": prediction[0][0],
            "estimatedPriceDate": tomorrow_date.strftime("%Y-%m-%d")
        }

    except Exception as e:
        return {"error": str(e)}

