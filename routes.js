Router.configure({
   layoutTemplate: 'generalLayout'  //can be any template name
 });


Router.map(function () {
  this.route('postSubmitter', {
    data: {
      articleList: function () {return Posts.find()},
      selectedArticle: {}
    }
  });

  this.route('about');

  this.route('home', {
    path: '/',
    // articles now under `articleList` instead of `this`
    data: {
      articleList: function () {return Posts.find()},
      selectedArticle: {}
    }
  });

  this.route('article', {
    path: '/article/:slug',
    // provide data for both `articleList` and `selectedArticle`
    data: function () {
      return {
        articleList: Posts.find(),
        selectedArticle: Posts.findOne({slug: this.params.slug})
      }
    },
    template: 'articles'  //change template target
  });

  /*this.route('article', {
    path: '/article/:_id',
    // provide data for both `articleList` and `selectedArticle`
    data: function () {
      return {
        articleList: Posts.find(),
        selectedArticle: Posts.findOne({_id: this.params._id})
      }
    },
    template: 'articles'  //change template target
  });*/
});
