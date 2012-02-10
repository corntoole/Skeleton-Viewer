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
    $.getJSON(baseUrl + '/Me/links/', {'limit':100, 'offset': offset, 'fields':'{"title":1,"embed":1}'}, function(data) {
        if(!data || !data.length) {
            alert("no data!");
            return;
        }
        var tokens;
        var tokens_dict = {};
        var html = '';
        for(var i in data)
        {
            //if(!data[i].embed || data[i].embed.type != "photo") continue;
            if(!data[i].text ) continue;
            var text = data[i].text;
            var title = data[i].title;
            tokens.concat(text.match(/\w/g));
            tokens.concat(title.match(/\w/g));
            for (var t in tokens) {
                if (!tokens_dict[t]) tokens_dict[t] = 0;
                tokens_dict[t]+=1;
            }   
            // var p = data[i];
//             html += '<li><a id="url-'+p._id+'" href="#" title="" target="_blank"><img src="'+p.embed.url+'" /><span id="title-'+p._id+'"></span></a></li>';
//             $(function() {
//                 var id = p._id;
//                 $.getJSON(baseUrl + '/Me/links/encounters/'+p._id, function(encounters) {
//                     if(!encounters || !encounters.length) return;
//                     $("#title-"+id).text(encounters[0].from);
//                     $("#url-"+id).attr("href",encounters[0].link);
//                 });
//             });
//             console.log(data[i]);
        }
        var tokens_dict_sorted = sortDict(tokens_dict);
        for ( var entry in tokens_dict_sorted) {
            html += '<li>#'+entry+'  '+tokens_dict_sorted[entry]+'</li>\n';
        }
        console.log(html);
        html += $("#test").html();
        $("#test").html(html);
    });
}

$(function() {
    // be careful with the limit, some people have large datasets ;)
    $.getJSON(baseUrl + '/Me/photos/', {'limit':10}, function(data) {
        console.log(data);
        if(!data || !data.length) return;
        var html = "";
        for(var i in data)
        {
            html += "<img src='"+data[i].url+"' width='200' /> ";
        }
        $("#test").html(html);
        loadLinks();
    });
});

