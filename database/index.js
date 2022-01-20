module.exports = async (configs, mongoose) => {
    return await mongoose.connect(configs.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    });
};
