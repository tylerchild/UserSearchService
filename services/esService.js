var index = "my_blog";
var type = "users";
ElasticSearchClient = require('elasticsearchclient');
var Q = require('q');


var serverOptions = {
    host: 'localhost',
    port: 9200
};

var elasticSearchClient = new ElasticSearchClient(serverOptions);

function performSearch(field, term) {
    if (field === undefined) {
        field = "_all";
    }

    var deferred = Q.defer();
    console.log("Request handler 'search' was called.");
    var qryObj =
    {
        "query": {
            "match": {}
        }
    };
    qryObj.query.match[field] = term;
    elasticSearchClient.search(index, type, qryObj).
        on('data', function (data) {
            console.log(data)
            deferred.resolve(JSON.parse(data));
        })
        .on('error', function (err) {
            console.log(err);
            return deferred.resolve(err);
        })
        .exec();
    return  deferred.promise;
}

exports.performSearch = performSearch;



