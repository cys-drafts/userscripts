// ==UserScript==
// @name         Hacker News reorder
// @namespace    https://github.com/chaoys/userscripts
// @version      0.1
// @description  reorder Hacker News articles by points
// @author       cys
// @run-at       document-end
// @match        https://news.ycombinator.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function parseArticle(tr) {
        var id = tr.id;
        var art = {};

        art.tr1 = tr;
        var counter = document.querySelector('#score_'+id);
        if (counter == null) {
            art.score = 0;
            var age = document.querySelectorAll('.age > a[href="item?id='+id+'"]')[0];
            art.tr2 = age.parentElement.parentElement.parentElement;
        } else {
            art.score = counter.innerText.split(' ')[0];
            art.tr2 = counter.parentElement.parentElement;
        }

        articles.push(art);
    }

    var elem_itemlist = document.querySelector('.itemlist');
    var elem_tbody = elem_itemlist.getElementsByTagName('tbody')[0];
    var elem_spacers = document.querySelectorAll('.spacer');
    var elem_articles = document.querySelectorAll('.athing');
    var articles = new Array();

    elem_articles.forEach(parseArticle);

    articles.sort(function(a, b){return b.score - a.score});

    var i = 0;
    var new_tbody = document.createElement('tbody');
    articles.forEach(function(art) {
        new_tbody.append(art.tr1);
        new_tbody.append(art.tr2);
        new_tbody.append(elem_spacers[i]);
        i++;
    });

    elem_tbody.parentNode.replaceChild(new_tbody, elem_tbody);
})();
