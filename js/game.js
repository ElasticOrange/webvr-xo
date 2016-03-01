var scene = document.querySelector('a-scene');
var pieceContainer = document.querySelector('#pieces');
var xMarkTemplateString = document.querySelector('#x-mark-template').innerHTML;
var xMarkTemplate = nunjucks.compile(xMarkTemplateString);

var xMark = xMarkTemplate.render({
    position: '-1 3 0.1'
});

var oMarkTemplateString = document.querySelector('#o-mark-template').innerHTML;
var oMarkTemplate = nunjucks.compile(oMarkTemplateString);

var oMark = oMarkTemplate.render({
    position: '0 3 0.1'
});

scene.insertAdjacentHTML('beforeend', xMark);
scene.insertAdjacentHTML('beforeend', oMark);

// Set events
document.querySelector('#placeholder1').addEventListener(
    'click',
    function() {
        console.log('test');
    }
);
