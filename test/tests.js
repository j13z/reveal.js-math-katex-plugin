/* jshint strict: false */
/* global describe, it, expect */

// TODO: Improve tests.
//
//       Ported from old QUnit tests, so BDD style might be a bit odd in some
//       places.

describe('Formula replacements', function () {

	it('should find two elements with class `.formula`', function () {
		expect(elements('#slide-1 .formula').length).to.equal(2);
	});

	it('should find two elements with class `.katex`', function () {
		expect(elements('#slide-1 .katex').length).to.equal(2);
	});

	it('should replace all `$$` formulas', function () {
		expect(element('#slide-1').innerHTML).to.not.contain('$$');
	});

	it('should render LaTeX characters, with their unicode value as `textContent`', function () {
		each(elements( '#slide-1 .formula' ), function ( formula ) {
			expect(formula.textContent).to.contain('λ');
			expect(formula.textContent).to.contain('∑');
		});
	});
});


describe('`$` escapes', function () {

	it('should find replace dollar escapes', function () {
		expect(element('#slide-2 p').textContent).to.equal('This is an escaped dollar: $');
	});

	it('should not create any formulas when replacing `\\$`', function () {
		expect(elements('#slide-2 .formula').length).to.equal(0);
	});
});


describe('Ignored slides', function () {

	it('should not render any `$…$` formulas in slides that should be ignored', function () {
		expect(elements('#slide-3 .katex').length).to.equal(0);
	});

	it('should not change the slide', function () {
		expect(element('#slide-3 p').innerHTML).to.equal('Dollars $$$ should be ignored here. $');
	});
});


describe('Handling of `<` and `>` / HTML entities', function () {

	it('should render the correct number of formulas with entities', function () {
		var formulas = elements('#slide-4 .formula');
		expect(formulas.length).to.equal(2);
	});

	it('should replace `$$…$$` formulas', function () {
		expect(element('#slide-4').innerHTML).to.not.contain('$$');
	});

	it('should not change HTML entities', function () {
		// (The rendered formulas may include `&lt;` or `&gt;` entities,
		// depending on how KaTeX renders them. So only assert that entities
		// outside of formulas remain unchanged.)
		expect(element('#slide-4 .html-entities').innerHTML).to.equal('greater than: &gt;, less than: &lt;');
	});
});


describe('Handling of `&` and `pmatrix`', function () {

	it('should replace formulas correctly', function () {

		var formulas = elements('#slide-5 .formula, #slide-6 .formula');
		expect(formulas.length).to.equal(2);
		expect(formulas[1].innerHTML).to.not.contain('$$');

		each(formulas, function (formula) {
			expect(formula.textContent).to.not.contain('amp;');
		});
	});
});



// Helper methods

function element(selector) {
	return document.querySelector(selector);
}

function elements(selector) {
	return document.querySelectorAll(selector);
}

function each(arrayLike, callback) {
	for (var i = 0; i < arrayLike.length; i++) {
		callback(arrayLike[i], i);
	}
}
