const runicTable = [
	{name: 'El',	value: 28, 	block: 'Ort'},
	{name: 'Eld', 	value: 33, 	block: 'Sur'},
	{name: 'Tir', 	value: 9, 	block: 'Eth'},
	{name: 'Nef', 	value: 7, 	block: 'Ist'},
	{name: 'Eth', 	value: 31, 	block: 'Tir'},
	{name: 'Ith', 	value: 22, 	block: 'Pul'},
	{name: 'Tal', 	value: 8, 	block: 'Io'},
	{name: 'Ral', 	value: 25, 	block: 'Um'},
	{name: 'Ort', 	value: 18, 	block: 'El'},
	{name: 'Thul', 	value: 13, 	block: 'Sol'},
	{name: 'Amn', 	value: 6, 	block: 'Fal'},
	{name: 'Sol', 	value: 10, 	block: 'Thul'},
	{name: 'Shael', value: 17, 	block: 'Lem'},
	{name: 'Dol', 	value: 11, 	block: 'Hel'},
	{name: 'Hel', 	value: 12, 	block: 'Dol'},
	{name: 'Io', 	value: 20, 	block: 'Tal'},
	{name: 'Lum', 	value: 32, 	block: 'Gul'},
	{name: 'Ko', 	value: 27, 	block: 'Mal'},
	{name: 'Fal', 	value: 14, 	block: 'Amn'},
	{name: 'Lem', 	value: 26, 	block: 'Shael'},
	{name: 'Pul', 	value: 15, 	block: 'Ith'},
	{name: 'Um', 	value: 16, 	block: 'Ral'},
	{name: 'Mal', 	value: 21, 	block: 'Ko'},
	{name: 'Ist', 	value: 4, 	block: 'Nef'},
	{name: 'Gul', 	value: 23, 	block: 'Lum'},
	{name: 'Vex', 	value: 24, 	block: 'Ohm'},
	{name: 'Ohm', 	value: 1, 	block: 'Vex'},
	{name: 'Lo', 	value: 2, 	block: 'Cham'},
	{name: 'Sur', 	value: 30, 	block: 'Eld'},
	{name: 'Ber', 	value: 3, 	block: ''},
	{name: 'Jah', 	value: 5, 	block: 'Zod'},
	{name: 'Cham', 	value: 29, 	block: 'Lo'},
	{name: 'Zod', 	value: 19, 	block: 'Jah'}
];

// -------------------------Function generating Runic Words
exports.generateRunicWords = length => {
	//----------------------validation-----
	if(length < 1) {
		return("Input must be > 0");
	} else if (!length){
		return("Input cannot be empty");
	} else if (isNaN(length)){
		return("Input must be a number");
	//---------------------main function-----
	} else {
		let runicWords = [];
		let runicTempTable = runicTable.slice();
		let complete = false;
		//-----------------loop creating 10 words-----
			for (var i = 0; i < 10; i++) {
				let	singleWord = '';
				let blockedRunes = [];
				let wordRunicPower = 0;
				//---------loop creating single word-----
				for (var j = 0; j < length; j++) {
					let maxValue = 0;
					let indexOfMax = 0;
					//------check if there are any runes left----
					if(runicTempTable.length){
						let addNextRune = false;
						runicTempTable.forEach(function(rune){
							let skip = false;
							//------check if current rune is not blocked-----
							blockedRunes.forEach(function(invalid){
								if(rune.name === invalid){
									skip = true;
								}
							});
							//------check for higher value rune and if it should be skipped when blocked----
							if(rune.value > maxValue && !skip){
								maxValue = rune.value;
								indexOfMax = runicTempTable.indexOf(rune);
								addNextRune = true;
							}
						});
						if(addNextRune){
							//------dash between runes----------------------------
							if(j>0){
								singleWord += "-";	
							}						
							//------add chosen rune to the word being created-----
							singleWord += runicTempTable[indexOfMax].name;
							//------add rune blocked by chosen one so it would be skipped in this word-----
							blockedRunes.push(runicTempTable[indexOfMax].block);
							//------adding power----------------------------------
							wordRunicPower += runicTempTable[indexOfMax].value - 1;
							//------remove used rune from temp table
							runicTempTable.splice(indexOfMax, 1);
						}
					} else {					
						complete = true;
					}
				}
				//------check if complete	
				if(!complete){
					runicWords[i] = {word: singleWord, power: wordRunicPower};
				}
			}
		return runicWords;
	}
};

// Function validating and measuring Runic Words
exports.checkRunicWord = runicWord => {
	//-------------validation--------
	if(!runicWord){
		return("Runic word cannot be empty");	
	} else if(runicWord !== runicWord.toString()){
		return("Runic word must be a string");
	//-------------main function-----
	} else {
		let isError = false;		
		let runesInWord = runicWord.split("-");
		let runicWordPower = 0;
		runesInWord.forEach(function(rune){
			let occurance = 0;
			let runeCheckError = false;
			//---------------check for duplicates-----
			runesInWord.forEach(function(duplicate){
				if(duplicate === rune){
					occurance++;
				}
				if(occurance>1){
					isError = true;
				}
			});
			//---------------check if runes don't block each other-----
			runicTable.forEach(function(row){
				if(row.name === rune){
					runesInWord.forEach(function(blocked){
						if(row.block === blocked){
							isError = true;
						}
					});
					//--------------check if rune exists in runic table------
					runeCheckError = true;
					//----------------adding power-----
					runicWordPower += row.value - 1;
				}
			});
			if(runeCheckError === false){
				isError = true;
			}
		});
		if(isError){
			return("Invalid runic word");
		} else {			
			return(runicWordPower);
		}
	}
};