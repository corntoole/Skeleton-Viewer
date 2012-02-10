var baseUrl = false;
var offset = 0;

$(document).ready(function() {
    if(baseUrl === false) window.alert("Couldn't find your locker, you might need to add a config.js (see https://me.singly.com/Me/devdocs/)");
});

function sortDict(d) {
    var sorted = {};
    for (var k in d) {
        if (!sorted[d[k]]) sorted[d[k]] = [];
        sorted[d[k]].push(k);
    }
    return sorted;
}

function loadLinks(){
<<<<<<< HEAD
    console.log("Test!!!!");
    $.getJSON(baseUrl + '/Me/links/', {'limit':100, 'offset': offset, 'fields':'{"title":1,"embed":1}'}, function(data) {
=======
    $.getJSON(baseUrl + '/Me/links/', {'limit':20, 'offset': offset, 'fields':'{"title":1,"text":1,"embed":1}', 'full':true}, function(data) {
>>>>>>> 9c3ecdf9c12db6c26c35853187156aba256883bb
        if(!data || !data.length) {
            console.log("no data!");
            return;
        }
        console.log(data);
        //var tokens = [];
        var tokens_dict = {};
        var html = '';
        for(var i in data)
        {
            if(!data[i].text ) continue;
            var text = data[i].text;
            //var title = data[i].title;
            text += ' '+data[i].title;
            //TODO: Fix this hack where I concat text and title b/c I might want to analyze them separately
            var tokens = text.match(/(\w)+/g);
            //tokens.concat(title.match(/(\w)+/g));
            //console.log(tokens);
            for (var t in tokens) {
               var tok = tokens[t];
                if (!tokens_dict[tok]) tokens_dict[tok] = 0;
                tokens_dict[tok]+=1;
            } 
            console.log(tokens_dict);
               }
        var tokens_dict_sorted = sortDict(tokens_dict);
        html += '<ul>';
        for ( var entry in tokens_dict_sorted) {
            html += '<li>#'+entry+'  '+tokens_dict_sorted[entry]+'</li>\n';
        }
<<<<<<< HEAD
        html += '</ul>';
        $("#test").html(html);
=======
>>>>>>> 9c3ecdf9c12db6c26c35853187156aba256883bb
        console.log(html);
        html = $("#test").html() + html;
        $("#test").html(html);
    });
}

$(function() {
	var html = "";
	$("#test").html(html);
	loadLinks();
});

