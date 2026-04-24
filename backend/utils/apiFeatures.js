class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    search(){
       let keyword= this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {}
        this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryStringCopy={...this.queryString};
        const removeFields=['keyword','limit','page'];
        removeFields.forEach(field=> delete queryStringCopy[field])
        let queryString=JSON.stringify(queryStringCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        this.query=this.query.find(JSON.parse(queryString));
        return this;
    }

    paginate(resPerpage){
        const currentPage=Number(this.queryString.page) || 1;
        const skip=resPerpage*(currentPage-1)
        this.query.limit(resPerpage).skip(skip)
        return this;
    }
       }
    
module.exports=APIFeatures; 