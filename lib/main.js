var Slugify = function() {
  this.charmap = {
    '€': 'euro', '₢': 'cruzeiro', '₣': 'french franc', '£': 'pound',
    '₤': 'lira', '₥': 'mill', '₦': 'naira', '₧': 'peseta', '₨': 'rupee', '₹': 'indian rupee',
    '₩': 'won', '₪': 'new shequel', '₫': 'dong', '₭': 'kip', '₮': 'tugrik',
    '₯': 'drachma', '₰': 'penny', '₱': 'peso', '₲': 'guarani', '₳': 'austral',
    '₴': 'hryvnia', '₵': 'cedi', '¢': 'cent', '¥': 'yen', '元': 'yuan',
    '円': 'yen', '﷼': 'rial', '₠': 'ecu', '¤': 'currency', '฿': 'baht',
    "$": 'dollar',
    '©':'(c)', 'œ': 'oe', 'Œ': 'OE', '∑': 'sum', '®': '(r)', '†': '+',
    '“': '"', '”': '"', '‘': "'", '’': "'", '∂': 'd', 'ƒ': 'f', '™': 'tm',
    '℠': 'sm', '…': '...', '˚': 'o', 'º': 'o', 'ª': 'a', '•': '*',
    '∆': 'delta', '∞': 'infinity', '♥': 'love', '&': 'and', '|': 'or',
    '<': 'less', '>': 'greater'
  };

  this.space = '-';
}

Slugify.prototype.prepare = function(text) {
  return text.toLowerCase().trim()
}

Slugify.prototype.clean = function(text) {
  return this.prepare(text).replace( /[\s]+/g, this.space );
};

Slugify.prototype.transliterate = function(text){
  // TODO: charmap
  return text.replace( /[^-\w]+/g, '' );
};

Slugify.prototype.toURL = function(text) {
  var url = this.clean(text);
  return this.transliterate(url);
};

Slugify.prototype.toTags = function(text) {
  return this.prepare(text).split(' ');
};

Slugify.prototype.slugifyArray = function(array) {
  var self = this;

  return array.map(function(element) {
    return self.toURL(element);
  });
};

Slugify.prototype.unSlugify = function( text ) {
  return text
    .replace(/-/g, ' ').replace(/\w\S*/g, function(t){
      return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
    })
    .replace(/ And /g, ' &amp; ');
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
module.exports = slugg = new Slugify;
