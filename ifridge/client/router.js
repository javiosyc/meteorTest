
Router.configure(
    {
        layoutTemplate:'layout' 
    }
);

Router.map(function(){
    this.route('message',{path:'/'});
    this.route('about',{path:'/about'});
    this.route('builder',{path:'/builder'});
})
