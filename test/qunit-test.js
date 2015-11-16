'use strict';
/* jshint globalstrict: true */
/* global QUnit, Reveal, test, strictEqual */


Reveal.addEventListener( 'math-rendered', function () {

	QUnit.module( 'math-katex' );


	test( 'Formula replacements', function () {

		strictEqual( elements( '#slide-1 .formula' ).length, 2, 'found two elements with class `.formula`' );
		strictEqual( elements( '#slide-1 .katex'   ).length, 2, 'found two elements with class `.katex`' );
		strictEqual( element( '#slide-1' ).innerHTML.indexOf( '$$' )  === -1, true, 'replaced all `$$` formulas' );

		each( elements( '#slide-1 .formula' ), function ( formula ) {
			strictEqual( formula.classList.contains( 'formula' ), true, 'has class `formula`' );
			strictEqual( formula.textContent.indexOf( 'λ' ) !== -1, true, 'replaced `\\lamdba`' );
			strictEqual( formula.textContent.indexOf( '∑' ) !== -1, true, 'replaced `\\sum`' );
		});
	});


	test( '`$` escapes', function () {

		strictEqual( element( '#slide-2 p' ).textContent, 'This is an escaped dollar: $', 'found escaped dollar' );
		strictEqual( elements( '#slide-2 .formula' ).length, 0, 'did no find any formulas' );
	});


	test( 'Ignored slide', function () {

		strictEqual( elements( '#slide-3 .katex' ).length, 0, 'did not render any formulas' );
		strictEqual( element( '#slide-3 p' ).innerHTML, 'Dollars $$$ should be ignored here. $', 'did not change the slide' );
	});


	test( '`<` and `>` / HTML entities', function () {

		var formulas = elements( '#slide-4 .formula' );

		strictEqual( formulas.length, 2, 'found two formulas' );

		strictEqual( element( '#slide-4' ).innerHTML.indexOf( '$$' ),   -1, 'did replace `$$`' );

		// (The rendered formulas may include `&lt;` or `&gt;` entities, depending
		// on how KaTeX renders them. So only assert that entities outside of
		// formulas remain unchanged.)
		var text = 'greater than: &gt;, less than: &lt;';
		strictEqual( element( '#slide-4 .html-entities' ).innerHTML, text, 'did not change HTML entities' );
	});

});



Reveal.initialize({

	math: {
		enableGlobally: false,

		katexScript:     '../math-katex/lib/katex-0.5.1/katex.min.js',
		katexStylesheet: '../math-katex/lib/katex-0.5.1/katex.min.css'
	},

	dependencies: [
		{ src: '../math-katex/math-katex.js', async: true }
	]
});



// Shortcuts methods

function element( selector ) {
	return document.querySelector( selector );
}

function elements( selector ) {
	return document.querySelectorAll( selector );
}

function each( arrayLike, callback ) {
	for ( var i = 0; i < arrayLike.length; i++ ) {
		callback( arrayLike[i], i );
	}
}
