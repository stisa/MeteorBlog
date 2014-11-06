//instantiate mongodb
Posts = new Mongo.Collection("posts");

function slugify(text) {

    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');         // Trim - from end of text
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


if (Meteor.isClient) {
  Template.postSubmitter.helpers({
  });

  Template.postSubmitter.events({
    'click .saveButton': function () {
      //insert post in database
      var textIn = document.getElementById('text-input').value;     //get post text
      var authorIn = document.getElementById('author-input').value; //get post author
      var titleIn = document.getElementById('title-input').value;   //get post title
      var titleSlug = slugify(titleIn);                             //generate title slug
      var dateIn = new Date();
      var mongoIn = { author: authorIn, title: titleIn, date: dateIn.toDateString(), dateSort: new Date(), slug: titleSlug, content: textIn };
      Posts.insert(mongoIn);

      //remove post form
      var parent = document.getElementById("parentDestroy");
      var child = document.getElementById("removable");
      parent.removeChild(child);

      //print success message
      var textPosted= document.createTextNode("Posted!");
      var postedChild = document.createElement('p').appendChild(textPosted);
      parent.appendChild(postedChild);
    }
  });
  
  
  
}

