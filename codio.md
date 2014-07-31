codio
	https://codio.com/s/docs/boxes/box-parts/

box-parts


Preinstalled

The are a few of the notable things that come preinstalled on a Codio Box

	NodeJS (use nvm; please refer to this section for information on running NodeJS under nvm)
	Ruby (uses rbenv; please refer to this section for information on running Ruby under rbenv)
	Python 2.7.3 (Python 3.0 available as Box Part)
	Git, Mercurial and SVN
----------------------------------------
install meteor
	parts install meteor
----------------------------------------
add meteorite 
	npm install -g meteorite


Meteorite is a Meteor version manager and package manager. 
It provides an easy way to run different versions of meteor, use non-core packages, and to install packages from the Atmosphere package repository.

https://github.com/oortcloud/meteorite/

mrt update
-----------------------------------------
create project
	mrt create ifridge

cd ifridge

add jquery, bootstrap-3

mrt add jquery
mrt add bootstrap-3

query module
 file : ifridge/.meteor/packages

-----------------------------------------

deploy to server..

mrt deploy url

mrt deploy --delete url


list deploy project
 meteor list-sites

---------------------------

git clone https://github.com/c3h3/hello-meteor.git

git checkout hello-guestbook



mrt mongo


show dbs

use dbName
show collections

db.collectionName.find();


db.collectionName.drop();

db.collectionName.insert({text:”Hello …."});




db.collectionName.find().pretty();

db.collectionName.find( {author :”test"}); 


db.users.find({"name": /.*m.*/})




----------------
Foods.find({foodName:{$regex:criteria}});


Foods.find({}, {sort: {date_created: -1}});

------------------------------
http://subtlepatterns.com/hixs-evolution/

--------------------------
pull-right 
lable
<div class="lendee pull-right label {{LendClass}}">
				{{Lendee}}</div>
		
        
-------------------------
meteor remove autopublish