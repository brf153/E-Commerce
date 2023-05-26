class ApiFeatures{
    constructor(query,queryStr){
<<<<<<< HEAD
        this.query= query;
        this.queryStr=queryStr;
    }

    search(){
=======
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){

>>>>>>> dev
        const keyword = this.queryStr.keyword ? 
        {
            name:{
            $regex: this.queryStr.keyword,
            $options: "i",//case sensitive matlab uppercase and lower case dono dhundke dega
            }
        }:{};

        this.query= this.query.find({...keyword});
<<<<<<< HEAD
    }

        filter(){
            const queryCopy = {...this.queryStr}

            // Removing some fields for category
            const removeFields = ["keyword","page","limit"];

            removeFields.forEach(key=> delete queryCopy[key]);

            //Filter for Price and Rating

            let queryStr = JSON.stringify(queryCopy);
            queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);
        
        this.query = this.query.find(JSON.parse(queryStr));
=======
        return this;
    }

    filter(){

        const queryCopy = { ...this.queryStr };

        // Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        //Filter for Price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

>>>>>>> dev
        return this;
    }

    pagination(resultPerPage){
<<<<<<< HEAD
        const currentPage= Number(this.queryStr.page) || 1; //50 - 10
=======

        const currentPage = Number(this.queryStr.page) || 1; //50 - 10
>>>>>>> dev

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports= ApiFeatures;