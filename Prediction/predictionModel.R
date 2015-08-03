TRAIN_PROP = 0.70
TEST_PROP = 1-TRAIN_PROP

rental <- read.csv("./input/rental_data_SF.csv")
weather <- read.csv("./input/weather_082013_032014.csv")
stations <- read.csv("./input/station_data_SF.csv")

head(rental)
attach(rental)
ntrain <- floor(TRAIN_PROP*nrow(rental));
train <- rental[0:ntrain,] 
test <- rental[(ntrain+1):nrow(rental),]
# Classification Tree with rpart
library(rpart)

# grow tree 
fit <- rpart(bikeIn ~ time + day + holiday + station_id,
             method="class",
             data=train,
             control = rpart.control(minsplit = 200,cp=0))

pred <- predict(object = fit, newdata = test)
head(pred)
final <- data.frame(Id = testW$Id , pred)
colnames(final)  <- c("Id",levels(train$Category))

head(final)

write.csv(final,file = "~/GitHub/Kaggle/crime/my_sub_3.csv",row.names = FALSE,quote = F)
