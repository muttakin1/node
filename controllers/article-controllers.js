var Article = require('./../models/Article.js');

module.exports.new = function(request, response) {
  response.render('form.ejs');
}

module.exports.create = function(request, response) {
  var new_article = new Article(request.body);
  new_article.save(function(err, data) {
    if (err)
      return response.status(400)
        .json({
          error: "Please add a title"
        });
    console.log(data);
    return response.status(200)
      .json({
        message: "Article successfully created"
      });

  })
  console.log(request.body);
}

module.exports.list = function(request, response) {
Article.find(function(err, data){
  if(err){
    response.status(400)
      .json({
        error: "Database query error"
      });
  }

  response.status(200).json({
    articles: data
  });
});

}
module.exports.single = function(request, response) {

  Article.findOne({_id:request.params.articleID},
    function(err, data){
      if(err){
        response.status(400)
          .json({
            error: "Database query error"
          });
      }else{
      response.render('article.ejs', {
        article: data
      })
    }
  });

}