# Bike-Rental-Prediction
This project aims at predicting the bike rentals for SF Bay Area Bike Sharing system.

## Data Description
The following data are used :
 * **Rental Data:** status and number of bikes available for each station (http://www.bayareabikeshare.com/datachallenge)
 * **Weather Data:** Hourly weather data including temperature, precipitation, wind speed (http://www.ncdc.noaa.gov)
 * **Stations Data:** Geographic position of each stations (http://www.bayareabikeshare.com/datachallenge)
 * **Income Data:** Average Income per Household per area (https://data.sfgov.org/Economy-and-Community/Per-Capita-and-Household-Median-Income-San-Francis/rhzi-zuvx)
 * **Population Data:** Population & Job rate per area (https://data.sfgov.org/Economy-and-Community/Job-Density-San-Francisco-CA/hrfg-mcek)
 * **Places Data:** Amount of stores & businesses around a specific station  (https://developers.google.com/maps/documentation/javascript/places )

## Data Preparation
The data were gathered in three datasets:
 * **Rental:** Computing of the bike in and out of each stations, each hours
 * **Weather:** Cleanning the weather data 
 * **Stations:** Gathering all geographic data to have attributes for each bike stations
 
## Prediction Model
A SAS project allowed to compare different predicting models and optimize the prediction :
 * Linear Regression
 * Decision Tree
 * Neural Network
 
An R Solution with an automatic reporting using Shiny is under development.
