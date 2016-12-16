(function(){

var fs = require('fs');
var package = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var plugins = JSON.parse(fs.readFileSync('plugins.json', 'utf8'));
if(!package || !plugins){
	return;
}
var pttrn = /^strider-.+$/
for (let field in plugins) {
	if(!pttrn.test(field)){
		let value = plugins[field];
		delete plugins[field];
		plugins["strider-"+field] = value;
	}
}
if(package.dependencies){
	for (let field in package.dependencies) {
		if(pttrn.test(field)){
			delete package.dependencies[field];
		}
	}
} else {
	package.dependencies = {};
}
Object.assign(package.dependencies, plugins);
fs.writeFileSync('package.json', JSON.stringify(package, null, 4));

})();