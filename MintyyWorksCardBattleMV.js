
/*:
*
* @plugindesc An exclusive card battle system for MintyyWorks Med Lab.
* @author MintyySDT
*
* @param INTRO SETUP
* 
* @param Default Enemy Speech Time
* @desc This is the default time count before the speech can automatically cancelled. (Changable from Plugin Commands).
* @default 1000
* 
* @param Default Speech Background
* @desc This is the default background of the speech intro. (Changable from Plugin Commands).
* @default SpeechBG
* 
* @param Default Speech Audio
* @desc This is the default speech audio of the speech intro. (Changable from Plugin Commands).
* @default Speech
* 
* @param Default Speech Audio Volume
* @desc This is the default speech audio volume of the speech intro. (Changable from Plugin Commands).
* @default 100
* 
* @param Default Speech Audio Pitch
* @desc This is the default speech audio pitch of the speech intro. (Changable from Plugin Commands).
* @default 100
* 
* @param Default Speech Audio Pan
* @desc This is the default speech audio panning of the speech intro. (Changable from Plugin Commands).
* @default 0
*
* @param CHAR_SETUP
*
*
* @param Player Life ID
* @desc The id of the variable that would represent your player's life.
* @default 1
*
* @param Computer Life ID
* @desc The id of the variable that would represent the computer's life.
* @default 2
*
* @param Player Window X
* @desc The x position of the player's window displaying name and vitality.
* @default 150
*
* @param Player Window Y
* @desc The y position of the player's window displaying name and vitality.
* @default 930
*
* @param Player Window W
* @desc The width of the player's window displaying name and vitality.
* @default 340
*
* @param Player Window H
* @desc The height of the player's window displaying name and vitality.
* @default 200
*
* @param Player Window O
* @desc The height of the player's window displaying name and vitality.
* @default 0
*
* @param Computer Window X
* @desc The x position of the computer's window displaying name and vitality.
* @default 150
*
* @param Computer Window Y
* @desc The y position of the computer's window displaying name and vitality.
* @default 0
*
* @param Computer Window W
* @desc The width of the computer's window displaying name and vitality.
* @default 340
*
* @param Computer Window H
* @desc The height of the computer's window displaying name and vitality.
* @default 200
*
* @param Computer Window O
* @desc The height of the computer's window displaying name and vitality.
* @default 0
*
* @param SCENE
*
* @param Scene BGM
* @desc The bgm played when the scene is started. Must be under bgm folder.
* @default Theme1
*
* @param Scene BGM Volume
* @desc The volume of the bgm played when the scene is started. 
* @default 100
*
* @param Scene BGM Pitch
* @desc The pitch of the bgm played when the scene is started.
* @default 100
*
* @param Scene BGM Pan
* @desc The panning value of the bgm played when the scene is started.
* @default 0
*
*/

'use strict';

var Imported = Imported || {};
Imported.MintyyWorksCardBattleMV = true;

var MintyyWorks = MintyyWorks || {};
MintyyWorks.CardBattle = MintyyWorks.CardBattle || {};
MintyyWorks.CardBattle.dataParameters = PluginManager.parameters('MintyyWorksCardBattleMV');



MintyyWorks.CardBattle.aliases = {
    Game_System : {
        initialize : Game_System.prototype.initialize,
    },

    Game_Interpreter : {
        pluginCommand : Game_Interpreter.prototype.pluginCommand,
    },

    Game_Actor : {
        initMembers : Game_Actor.prototype.initMembers,
    }
}

MintyyWorks.CardBattle.CardSetupBGM = function(){
    let audio = {
        name: 'Field2',
        volume: 100,
        pitch: 100,
        pan: 0
    }
    AudioManager.playBgm(audio);
};

MintyyWorks.CardBattle.CardOKSe = function() {
    let audio = {
        name: 'Saint5',
        volume: 100,
        pitch: 100,
        pan: 0
    }

    AudioManager.playSe(audio);
};

function remove(arr, item) {
    for(var i = arr.length; i--;) {
        if(arr[i] === item) {
            arr.splice(i, 1);
        }
    }
}

MintyyWorks.CardBattle.WindowSetup = function(parameters) {
    if (parameters === 'Player Window W') {
        return Number(MintyyWorks.CardBattle.dataParameters['Player Window W']);
    }
    if (parameters === 'Player Window H') {
        return Number(MintyyWorks.CardBattle.dataParameters['Player Window H']);
    }
    if (parameters === 'Player Window X') {
        return Number(MintyyWorks.CardBattle.dataParameters['Player Window X']);
    }
    if (parameters === 'Player Window Y') {
        return Number(MintyyWorks.CardBattle.dataParameters['Player Window Y']);
    }    
    if (parameters === 'Player Window O') {
        return Number(MintyyWorks.CardBattle.dataParameters['Player Window O']);
    }    
    if (parameters === 'Computer Window W') {
        return Number(MintyyWorks.CardBattle.dataParameters['Computer Window W']);
    }
    if (parameters === 'Computer Window H') {
        return Number(MintyyWorks.CardBattle.dataParameters['Computer Window H']);
    }
    if (parameters === 'Computer Window X') {
        return Number(MintyyWorks.CardBattle.dataParameters['Computer Window X']);
    }
    if (parameters === 'Computer Window Y') {
        return Number(MintyyWorks.CardBattle.dataParameters['Computer Window Y']);
    }    
    if (parameters === 'Computer Window O') {
        return Number(MintyyWorks.CardBattle.dataParameters['Computer Window O']);
    }        

}

MintyyWorks.CardBattle.TimeSetup = function(parameters) {
    if (parameters === 'Default Enemy Speech Time') {
        return Number(MintyyWorks.CardBattle.dataParameters['Default Enemy Speech Time']);
    }
}

MintyyWorks.CardBattle.Speech = function(parameters) {
    if (parameters === 'Default Speech Background') {
        return String(MintyyWorks.CardBattle.dataParameters['Default Speech Background']);
    }

    if (parameters === 'Default Speech Audio') {
        return String(MintyyWorks.CardBattle.dataParameters['Default Speech Background']);
    }

    if (parameters === 'Default Speech Volume') {
        return Number(MintyyWorks.CardBattle.dataParameters['Default Speech Volume']);
    }

    if (parameters === 'Default Speech Pitch') {
        return Number(MintyyWorks.CardBattle.dataParameters['Default Speech Pitch']);
    }

    if (parameters === 'Default Speech Pan') {
        return Number(MintyyWorks.CardBattle.dataParameters['Default Speech Pan']);
    }


}

let z = 0;

MintyyWorks.CardBattle.animatePhaseTimer = 90;

// ------------------------------------------------------------------------------------
// Game System: this part, we are going to create two variables to do the faces of each
// player. They are stored from PlayerFace and ComputerFace.
// ------------------------------------------------------------------------------------
Game_System.prototype.initialize = function() {
    MintyyWorks.CardBattle.aliases.Game_System.initialize.call(this); //call original method
    this.playerName = null; // player's name initially
    this.computerName = null; // computer's name initially

    // we are going to setup the character sprite value whenever we go into duel mode:
    this.contenderSpriteName = null; // this is a string, so we're going to format it 
    //later on the side of the plugin command.

    // we are going to set the computer's entire cards from Game System:

    this.computerCards = []; // we are going to set it as an array.


    // speech time
    this.speechTime = MintyyWorks.CardBattle.TimeSetup('Default Enemy Speech Time');

    // speech BG

    this.speechBG = MintyyWorks.CardBattle.Speech('Default Speech Background');

    // speech Audio
    this.speechAudio = MintyyWorks.CardBattle.Speech('Default Speech Audio');
    this.speechAudioVolume = MintyyWorks.CardBattle.Speech('Default Speech Audio Volume');
    this.speechAudioPitch = MintyyWorks.CardBattle.Speech('Default Speech Audio Pitch');
    this.speechAudioPan = MintyyWorks.CardBattle.Speech('Default Speech Audio Pan');
};

Game_Actor.prototype.initMembers = function() {
    MintyyWorks.CardBattle.aliases.Game_Actor.initMembers.call(this);
    this.allPlayerCards = []; // each player would have their own cards. But, since the 
    // player is a single player, this would hold all current cards.

    // create the tradable cards here:
    this.allTradableCards = [1, 2, 3, 4, 5];
};

ImageManager.loadCCB = function(filename, hue) {
    return this.loadBitmap('img/cardbattle/', filename, hue, true);
};

ImageManager.loadCCBCards = function(filename, hue) {
    return this.loadBitmap('img/cardbattle/cards/', filename, hue, true);
};


Game_Interpreter.prototype.pluginCommand = function(command, args) {
    MintyyWorks.CardBattle.aliases.Game_Interpreter.pluginCommand.call(this, command, args);
    switch(command) {
        case 'CardBattle':
            if (args[0] === 'Start') {
                SceneManager.push(Scene_Speech);
            }
            if(args[0] === 'ContenderSprite') {
                // we will assign the given plugin command to the contender sprite name:
                $gameSystem.contenderSpriteName = String(args[1]);
            }
            if(args[0] === 'PlayerName') {
                $gameSystem.playerName = String(args[1]);
            }
            if(args[0] === 'ComputerName') {
                $gameSystem.computerName = String(args[1]);
            }  
            if (args[0] == 'addComputerCard') {
                var cardId = Number(args[1]);
                var bitmap = $dataItems[cardId].name;
                var a = Number($dataItems[cardId].meta.alpha);
                var b = Number($dataItems[cardId].meta.beta);
                var g = Number($dataItems[cardId].meta.gamma);
                var d = Number($dataItems[cardId].meta.delta);
                var s = Number($dataItems[cardId].meta.sigma);
                let card = new Sprite_Card();
                card.set(bitmap, cardId, a, b, g, d, s);
                $gameSystem.computerCards.push(card);
            }
            if(args[0] === 'SpeechTime') {
                $gameSystem.speechTime = Number(args[1]);
            } 
            if(args[0] === 'SpeechAudio') {
                $gameSystem.speechAudio = String(args[1]);
                $gameSystem.speechAudioVolume = Number(args[2]);
                $gameSystem.speechAudioPitch = Number(args[3]);
                $gameSystem.speechAudioPan = Number(args[4]);
            }            
            break;
             
    }
};

class Game_Card {
    initialize() {
        this.attack = 0;
        this.defense = 0;
        this.effect = null;
        this.animation = 0;
        this.element = null;
        this.name = null;
        this.imageName = null;
    }

    setName(name){this.name = String(name)};
    setImageName(img_name){this.imageName = String(img_name)};
    setAttack(attack){this.attack = Number(attack)};
    setDefense(defense){this.defense = Number(defense)};
    setAnimation(animation){this.animation = Number(animation)};
    setEffect(effect){this.effect = String(effect)};
    setElement(element){this.element = String(element)};

    static createCard() {
        return new Game_Card();
    }

}


function Window_DeployFunction() {
    this.initialize.apply(this, arguments);
}

Window_DeployFunction.prototype = Object.create(Window_Command.prototype);
Window_DeployFunction.prototype.constructor = Window_DeployFunction;

Window_DeployFunction.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.selectLast();
};

Window_DeployFunction._lastCommandSymbol = null;

Window_DeployFunction.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

Window_DeployFunction.prototype.windowWidth = function() {
    return 240;
};

Window_DeployFunction.prototype.numVisibleRows = function() {
    return this.maxItems();
};

Window_DeployFunction.prototype.makeCommandList = function() {
    this.addMainCommands();
};

Window_DeployFunction.prototype.addMainCommands = function() {
    this.addCommand('Alpha', 'alpha', true);
    this.addCommand('Beta', 'beta', true);
    this.addCommand('Gamma', 'gamma', true);
    this.addCommand('Delta', 'delta', true);    
    this.addCommand('Sigma', 'sigma', true); 
};

Window_DeployFunction.prototype.processOk = function() {
    Window_DeployFunction._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};

Window_DeployFunction.prototype.selectLast = function() {
    this.selectSymbol(Window_DeployFunction._lastCommandSymbol);
};





function Window_CardFunction() {
    this.initialize.apply(this, arguments);
}

Window_CardFunction.prototype = Object.create(Window_Command.prototype);
Window_CardFunction.prototype.constructor = Window_CardFunction;

Window_CardFunction.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.selectLast();
};

Window_CardFunction._lastCommandSymbol = null;

Window_CardFunction.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

Window_CardFunction.prototype.windowWidth = function() {
    return 240;
};

Window_CardFunction.prototype.numVisibleRows = function() {
    return this.maxItems();
};

Window_CardFunction.prototype.makeCommandList = function() {
    this.addMainCommands();
};

Window_CardFunction.prototype.addMainCommands = function() {
    this.addCommand('Deploy', 'deploy', true);
    this.addCommand('Description', 'description', true);
};

Window_CardFunction.prototype.processOk = function() {
    Window_CardFunction._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};

Window_CardFunction.prototype.selectLast = function() {
    this.selectSymbol(Window_CardFunction._lastCommandSymbol);
};



Window_Base.prototype.drawFaceZ = function(faceName, faceIndex, x, y, width, height) {
    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    let bitmap = ImageManager.loadCCB(faceName);
    let pw = Window_Base._faceWidth;
    let ph = Window_Base._faceHeight;
    let sw = Math.min(width, pw);
    let sh = Math.min(height, ph);
    let dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    let dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    let sx = faceIndex % 4 * pw + (pw - sw) / 2;
    let sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
};

class Window_PlayerVitality extends Window_Base {
    constructor() {
        super();
    }

    initialize() {
        let x = 0;
        let y = 0;
        let width = MintyyWorks.CardBattle.WindowSetup('Player Window W');
        let height = MintyyWorks.CardBattle.WindowSetup('Player Window H');
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();        
    }

    refresh() {
        let x = this.textPadding();
        let width = this.contents.width - this.textPadding() * 2;
        this.contents.clear();
        let fn = $gameSystem.playerName;
        this.drawTextEx('Name: ' + $gameSystem.playerName, 0, 0);
        this.drawTextEx('Vitality: ' + String($gameVariables.value(1)), 0, 30);
        this.drawTextEx('NE: ', 0, 60);
    }

    open() {
        this.refresh();
        Window_Base.prototype.open.call(this);
    }

}

class Window_EnemyVitality extends Window_Base {
    constructor() {
        super();
    }

    initialize() {
        let x = 0;
        let y = 0;
        let width = MintyyWorks.CardBattle.WindowSetup('Computer Window W');
        let height = MintyyWorks.CardBattle.WindowSetup('Computer Window H');
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    }

    refresh() {
        let x = this.textPadding();
        let width = this.contents.width - this.textPadding() * 2;
        this.contents.clear();
        let fn = $gameSystem.playerName;
        this.drawTextEx( 'Name: ' + $gameSystem.computerName, 0, 0);
        this.drawTextEx('Vitality: ' + String($gameVariables.value(2)), 0, 30);
        this.drawTextEx('NE: ', 0, 60);
    }

    open() {
        this.refresh();
        Window_Base.prototype.open.call(this);
    }

}

class PhaseBackground extends Sprite {
    constructor() {
        super();
    }

    initialize() {
        Sprite.prototype.initialize.call(this);
        
    }

    setBitmap(bmp) {
        this.bitmap = ImageManager.loadCCB(bmp);
    }

    static createPhaseBackground() {
        return new PhaseBackground();
    }
}

class ScissorsButton extends Sprite_Button {
    constructor() {
        super();
    }

    initialize() {
        Sprite.prototype.initialize.call(this);
        this._clickHandler = null;
        this._touching = false;
        this.setBitmap();
    }

    setBitmap() {
        this.bitmap = ImageManager.loadCCB('ScissorCard');
    }

    setClickHandler(method) {
        this._clickHandler = method;
    }

    setClickHandler(method) {
        this._clickHandler = method;
    }

    update() {
        Sprite.prototype.update.call(this);
        this.processTouch();
    }

    callClickHandler() {
        if (this._clickHandler) {
            this._clickHandler();
        }
    }

    processTouch() {
        if (this.isActive()) {
            if (TouchInput.isTriggered() && this.isButtonTouched()) {
                this._touching = true;
            }
            if (this._touching) {
                if (TouchInput.isReleased() || !this.isButtonTouched()) {
                    this._touching = false;
                    if (TouchInput.isReleased()) {
                        this.callClickHandler();
                    }
                }
            }
        } else {
            this._touching = false;
        }
    };

    isButtonTouched() {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    canvasToLocalX(x) {
        var node = this;
        while (node) {
            x -= node.x;
            node = node.parent;
        }
        return x;
    };

    canvasToLocalY(y) {
        var node = this;
        while (node) {
            y -= node.y;
            node = node.parent;
        }
        return y;
    };

    isActive() {
        var node = this;
        while (node) {
            if (!node.visible) {
                return false;
            }
            node = node.parent;
        }
        return true;
    };

    static scissorcardCreate() {
        return new ScissorsButton();
    }

}

class PaperButton extends Sprite_Button {
    constructor() {
        super();
    }

    initialize() {
        Sprite.prototype.initialize.call(this);
        this._clickHandler = null;
        this._touching = false;
        this.setBitmap();
    }
    update() {
        Sprite.prototype.update.call(this);
        this.processTouch();
    }
    setBitmap() {
        this.bitmap = ImageManager.loadCCB('PaperCard');
    }

    setClickHandler(method) {
        this._clickHandler = method;
    }

    setClickHandler(method) {
        this._clickHandler = method;
    }

    callClickHandler() {
        if (this._clickHandler) {
            this._clickHandler();
        }
    }

    processTouch() {
        if (this.isActive()) {
            if (TouchInput.isTriggered() && this.isButtonTouched()) {
                this._touching = true;
            }
            if (this._touching) {
                if (TouchInput.isReleased() || !this.isButtonTouched()) {
                    this._touching = false;
                    if (TouchInput.isReleased()) {
                        this.callClickHandler();
                    }
                }
            }
        } else {
            this._touching = false;
        }
    };

    isButtonTouched() {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    canvasToLocalX(x) {
        var node = this;
        while (node) {
            x -= node.x;
            node = node.parent;
        }
        return x;
    };

    canvasToLocalY(y) {
        var node = this;
        while (node) {
            y -= node.y;
            node = node.parent;
        }
        return y;
    };

    isActive() {
        var node = this;
        while (node) {
            if (!node.visible) {
                return false;
            }
            node = node.parent;
        }
        return true;
    };

    static papercardCreate() {
        return new PaperButton();
    }

}

class WinSprite extends Sprite {
    constructor() {
        super();
    }
    initialize() {
        Sprite.prototype.initialize.call(this);
        this.createBitmap();
    }
    createBitmap() {
        this.bitmap = ImageManager.loadCCB('WinFOC');
    }
}

class LoseSprite extends Sprite {
    constructor() {
        super();
    }
    initialize() {
        Sprite.prototype.initialize.call(this);
        this.createBitmap();
    }
    createBitmap() {
        this.bitmap = ImageManager.loadCCB('LoseFOC');
    }
}

class DrawSprite extends Sprite {
    constructor() {
        super();
    }
    initialize() {
        Sprite.prototype.initialize.call(this);
        this.createBitmap();
    }
    createBitmap() {
        this.bitmap = ImageManager.loadCCB('TieFOC');
    }
}

class RockButton extends Sprite_Button {
    constructor() {
        super();
    }

    initialize() {
        Sprite.prototype.initialize.call(this);
        this._clickHandler = null;
        this._touching = false;
        this.setBitmap();
    }

    setBitmap() {
        this.bitmap = ImageManager.loadCCB('RockCard');
    }
    update() {
        Sprite.prototype.update.call(this);
        this.processTouch();
    }
    setClickHandler(method) {
        this._clickHandler = method;
    }

    setClickHandler(method) {
        this._clickHandler = method;
    }

    callClickHandler() {
        if (this._clickHandler) {
            this._clickHandler();
        }
    }

    processTouch() {
        if (this.isActive()) {
            if (TouchInput.isTriggered() && this.isButtonTouched()) {
                this._touching = true;
            }
            if (this._touching) {
                if (TouchInput.isReleased() || !this.isButtonTouched()) {
                    this._touching = false;
                    if (TouchInput.isReleased()) {
                        this.callClickHandler();
                    }
                }
            }
        } else {
            this._touching = false;
        }
    };

    isButtonTouched() {
        var x = this.canvasToLocalX(TouchInput.x);
        var y = this.canvasToLocalY(TouchInput.y);
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    };

    canvasToLocalX(x) {
        var node = this;
        while (node) {
            x -= node.x;
            node = node.parent;
        }
        return x;
    };

    canvasToLocalY(y) {
        var node = this;
        while (node) {
            y -= node.y;
            node = node.parent;
        }
        return y;
    };

    isActive() {
        var node = this;
        while (node) {
            if (!node.visible) {
                return false;
            }
            node = node.parent;
        }
        return true;
    };

    static rockButtonCreate() {
        return new RockButton();
    }

}

class Scene_CardBattle extends Scene_Base {
    constructor() {
        super();
        this.phaseTimer = 0;
        this.drawSpriteTimer = 20;
        this.mainGamePhaseTimer = 30;
        this.turnOrderSpriteTimer = false;
        this.mainPhaseStartTimer = false;

    

    }

    initialize() {
        Scene_Base.prototype.initialize.call(this);
        this.playerTurnFirst = false;
        this.currentPhase = null;
        this.playerTurnChoice = null;
        this.computerTurnChoice = null;
        
    }

    create() {
        Scene_Base.prototype.create.call(this);
        this.createWhosTurnPhase();    
    }

    createWhosTurnPhase() {

        // we are going to slip a phase name here, so we know where we're at.
        this.currentPhase = 'RPS';

        // in this phase, we do a simple rock, paper and scissors to determine
        // who would go first.

        this.createPhaseBackground();

        // create the buttons both for player and for computer.
        
        this.createAllPlayerButtons();
        this.createAllComputerButtons();

        
    }

    computerSetsChoiceAI() {
        let ai = Math.randomInt(3);
        switch(ai) {
            case 1: //rock
                this.computerIsSetToRock();
                break;
            case 2: //paper 
                this.computerIsSetToPaper();
                break;
            case 3: //scissors
                this.computerIsSetToScissors(); 
                break;

        }
    }

    setFirstTurnPhaseWinner() {
        if (this.playerTurnChoice === 'Rock') {
            if (this.computerTurnChoice === 'Paper') {
                this.playerTurnFirst = false;
                this.setTurnOrderCondition('Lose');
                this.turnOrderSpriteTimer = true;
                this.flashActionFirstTurnOrderPhase();
                
                
            }
            if (this.computerTurnChoice === 'Scissors') {
                this.playerTurnFirst = true;
                setTurnOrderCondition('Win');
                this.turnOrderSpriteTimer = true;
                this.flashActionFirstTurnOrderPhase();
                
            }
            if (this.computerTurnChoice === 'Rock') {
                // tie
                this.turnOrderSpriteTimer = true;
                this.setTurnOrderCondition('Draw');
            }
        }
        if (this.playerTurnChoice === 'Paper') {
            if (this.computerTurnChoice === 'Rock') {
                this.playerTurnFirst = true;
                this.setTurnOrderCondition('Win');
                this.turnOrderSpriteTimer = true;
                this.flashActionFirstTurnOrderPhase();
                
            }
            if (this.computerTurnChoice === 'Scissors') {
                this.setTurnOrderCondition('Lose');
                this.turnOrderSpriteTimer = true;
                this.playerTurnFirst = false;
                
                this.flashActionFirstTurnOrderPhase();
                
            }
            if (this.computerTurnChoice === 'Paper') {
                // tie
                this.turnOrderSpriteTimer = true;
                this.setTurnOrderCondition('Draw');
            }
        }

        if (this.playerTurnChoice === 'Scissors') {
            if (this.computerTurnChoice === 'Rock') {
                this.playerTurnFirst = false;
                this.setTurnOrderCondition('Lose');
                this.turnOrderSpriteTimer = true;
                this.flashActionFirstTurnOrderPhase();
                
            }
            if (this.computerTurnChoice === 'Paper') {
                this.playerTurnFirst = true;
                this.setTurnOrderCondition('Win');
                this.turnOrderSpriteTimer = true;
                this.flashActionFirstTurnOrderPhase();
                
            }
            if (this.computerTurnChoice === 'Scissors') {
                // tie
                // this.setTieAction();
                this.turnOrderSpriteTimer = true;
                this.setTurnOrderCondition('Draw');
            }
        }

    }

    flashActionFirstTurnOrderPhase() {
        this.startFadeOut(this.slowFadeSpeed(), true);
        this.removeChild(this.rockButtonForComputer);
        this.removeChild(this.rockButtonForPlayer);
        this.removeChild(this.paperButtonForComputer);
        this.removeChild(this.paperButtonForPlayer);
        this.removeChild(this.scissorsButtonForComputer);
        this.removeChild(this.scissorsButtonForPlayer);
        this.removeChild(this.background);
        
        
        SceneManager.push(Scene_CardBattleEX);

    }

    setTurnOrderCondition(condition) {
        switch(condition) {
            case 'Win':
                this.winSprite = new WinSprite();
                this.winSprite.opacity = 0;
                this.addChild(this.winSprite);
                break;
            case 'Lose':
                this.loseSprite = new LoseSprite();
                this.loseSprite.opacity = 0;
                this.addChild(this.loseSprite);
                break;
            case 'Draw':
                // Draw 
                this.drawSprite = new DrawSprite();
                this.drawSprite.opacity = 255;
                this.addChild(this.drawSprite);
                break;
        }
    }

    animateConditionSprite() {
        if (this.winSprite) {
            if (this.winSprite.opacity <= 255) {
                this.winSprite.opacity += 10;
            } 
        }
        if(this.loseSprite) {
            if (this.loseSprite.opacity <= 255) {
                this.loseSprite.opacity += 10;
            }
        }
        if(this.drawSprite) {
            if (this.drawSpriteTimer <= 0) {
                this.drawSpriteTimer = 10;
                this.removeChild(this.drawSprite);
            } else {
                this.drawSpriteTimer -= 1;
            }
        }        
    }

    setTieAction() {
        switch(this.computerTurnChoice) {
            case 'Rock':
                this.addChild(this.paperButtonForComputer);
                this.addChild(this.scissorsButtonForComputer);
                
                // this.computerTurnChoice = null;
                break;
            case 'Paper':
                this.addChild(this.rockButtonForComputer);
                this.addChild(this.scissorsButtonForComputer);    
                // this.computerTurnChoice = null;        
                break;
            case 'Scissors':
                this.addChild(this.rockButtonForComputer);
                this.addChild(this.paperButtonForComputer);
                // this.computerTurnChoice = null;
                break;
        }

        switch(this.playerTurnChoice) {
            case 'Rock':
                this.addChild(this.paperButtonForPlayer);
                this.addChild(this.scissorsButtonForPlayer);
                // this.playerTurnChoice = null;
                break;
            case 'Paper':
                this.addChild(this.rockButtonForPlayer);
                this.addChild(this.scissorsButtonForPlayer);  
                // this.playerTurnChoice = null;          
                break;
            case 'Scissors':
                this.addChild(this.rockButtonForPlayer);
                this.addChild(this.paperButtonForPlayer);
                // this.playerTurnChoice = null;
                break;
        }

    }

    singleOutUnselectedCards() {
        switch(this.computerTurnChoice) {
            case 'Rock':
                this.removeChild(this.paperButtonForComputer);
                this.removeChild(this.scissorsButtonForComputer);
                break;
            case 'Paper':
                this.removeChild(this.rockButtonForComputer);
                this.removeChild(this.scissorsButtonForComputer);            
                break;
            case 'Scissors':
                this.removeChild(this.rockButtonForComputer);
                this.removeChild(this.paperButtonForComputer);
                break;
        }
        switch(this.playerTurnChoice) {
            case 'Rock':
                this.removeChild(this.paperButtonForPlayer);
                this.removeChild(this.scissorsButtonForPlayer);
                break;
            case 'Paper':
                this.removeChild(this.rockButtonForPlayer);
                this.removeChild(this.scissorsButtonForPlayer);            
                break;
            case 'Scissors':
                this.removeChild(this.rockButtonForPlayer);
                this.removeChild(this.paperButtonForPlayer);
                break;
        }
    } 

    playerIsSetToRock() {
        this.playerTurnChoice = 'Rock';
        this.computerSetsChoiceAI();
        // this.singleOutUnselectedCards();
        this.setFirstTurnPhaseWinner();
    }

    playerIsSetToPaper() {
        this.playerTurnChoice = 'Paper';
        this.computerSetsChoiceAI();
        // this.singleOutUnselectedCards();
        this.setFirstTurnPhaseWinner();
    }

    playerIsSetToScissors() {
        this.playerTurnChoice = 'Scissors';
        this.computerSetsChoiceAI();
        // this.singleOutUnselectedCards();
        this.setFirstTurnPhaseWinner();
    }

    computerIsSetToRock() {
        this.computerTurnChoice = 'Rock';
    }

    computerIsSetToPaper() {
        this.computerTurnChoice = 'Paper';
    }

    computerIsSetToScissors() {
        this.computerTurnChoice = 'Scissors';
    }    

    createPhaseBackground() {
        // create background

        this.background = PhaseBackground.createPhaseBackground();
        this.background.setBitmap('TurnPhaseBackground');

        this.addChild(this.background);
        
        
    }

    createAllPlayerButtons() {
        this.rockButtonForPlayer = new Sprite_Button();
        this.rockButtonForPlayer.bitmap = ImageManager.loadCCB('RockCard');
        this.rockButtonForPlayer.x = 2000;
        this.rockButtonForPlayer.y = 500;
        this.addChild(this.rockButtonForPlayer);
        this.paperButtonForPlayer = new Sprite_Button();
        this.paperButtonForPlayer.bitmap = ImageManager.loadCCB('PaperCard');
        this.paperButtonForPlayer.x = 2000;
        this.paperButtonForPlayer.y = 500;
        this.addChild(this.paperButtonForPlayer);
        this.scissorsButtonForPlayer = new Sprite_Button();
        this.scissorsButtonForPlayer.bitmap = ImageManager.loadCCB('ScissorCard');
        this.scissorsButtonForPlayer.x = 2000;
        this.scissorsButtonForPlayer.y = 500;
        this.addChild(this.scissorsButtonForPlayer);
    }

    createAllComputerButtons() {
        this.rockButtonForComputer = RockButton.rockButtonCreate();
        this.rockButtonForComputer.x = -2000;
        this.rockButtonForComputer.y = 100;
        this.addChild(this.rockButtonForComputer);
        this.paperButtonForComputer = PaperButton.papercardCreate();
        this.paperButtonForComputer.x = -2000;
        this.paperButtonForComputer.y = 100;
        this.addChild(this.paperButtonForComputer);
        this.scissorsButtonForComputer = ScissorsButton.scissorcardCreate();
        this.scissorsButtonForComputer.x = -2000;
        this.scissorsButtonForComputer.y = 100;
        this.addChild(this.scissorsButtonForComputer);
    }    

    animateButtons() {



        if (this.rockButtonForPlayer.x <= 300) {
            this.rockButtonForPlayer.x = 300;
        } else {
            this.rockButtonForPlayer.x -= 50;
        }

        if (this.paperButtonForPlayer.x <= 850) {
            this.paperButtonForPlayer.x = 850;
        } else {
            this.paperButtonForPlayer.x -= 50;
        }

        if (this.scissorsButtonForPlayer.x >= 1400) {
            this.scissorsButtonForPlayer.x = 1400;
        } else {
            this.scissorsButtonForPlayer.x -= 50;
        }        

        if (this.rockButtonForComputer.x >= 300) {
            this.rockButtonForComputer.x = 300;
        } else {
            this.rockButtonForComputer.x += 50;
        }

        if (this.paperButtonForComputer.x >= 850) {
            this.paperButtonForComputer.x = 850;
        } else {
            this.paperButtonForComputer.x += 50;
        }

        if (this.scissorsButtonForComputer.x >= 1400) {
            this.scissorsButtonForComputer.x = 1400;
        } else {
            this.scissorsButtonForComputer.x += 50;
        }  


    
    }


    createGameBoardBackground() {
        this.background = PhaseBackground.createPhaseBackground()
        this.background.setBitmap('Sample_Background');
        this.addChild(this.background);
    }

    update() {
        Scene_Base.prototype.update.call(this);
        this.rockButtonForPlayer.setClickHandler(this.playerIsSetToRock.bind(this));
        this.paperButtonForPlayer.setClickHandler(this.playerIsSetToPaper.bind(this));
        this.scissorsButtonForPlayer.setClickHandler(this.playerIsSetToScissors.bind(this));
        if (this.phaseTimer <= MintyyWorks.CardBattle.animatePhaseTimer) {
            this.animateButtons();
            this.phaseTimer+=1;
        }

        if(this.turnOrderSpriteTimer) {
            this.animateConditionSprite();
        }

        
    }

}

class Sprite_Card extends Sprite_Button {
    constructor() {
        super();
        this.attack = null;
        this.alpha = null;
        this.beta = null;
        this.delta = null;
        this.sigma = null;
        this.cardId = null;
    }
    initialize() {
        Sprite_Button.prototype.initialize.call(this);
    }
    update() {
        Sprite_Button.prototype.update.call(this);       
    }
    set(bitmap, id, a, b, g, d, s) {
        this.bitmap = ImageManager.loadCCBCards(String(bitmap));
        this.cardId = Number(id);
        this.alpha = Number(a);
        this.beta = Number(b);
        this.gamma = Number(g);
        this.delta = String(d);
        this.sigma = Number(s);
    }

}

class Sprite_TradeCard extends Sprite_Button {
    constructor() {
        super();
        this.tradeId = null;
    }
    initialize() {
        Sprite_Button.prototype.initialize.call(this);
    }
    setId(id){this.tradeId = id};
    update() {
        Sprite_Button.prototype.update.call(this);
    }
}

class Scene_Speech extends Scene_Base {
    constructor() {
        super();
        this.speechTime = $gameSystem.speechTime;
    }

    initialize() {
        Scene_Base.prototype.initialize.call(this);
        this.backgroundSprite = new Sprite();
        this.backgroundSprite.bitmap = ImageManager.loadCCB($gameSystem.speechBG);
        this.addChild(this.backgroundSprite);
        this.createContenderSprite();
        this.playActorSpeech();
    }

    playActorSpeech() {
        let audio = {
            name: 'Speech',
            volume: 100,
            pitch: 100,
            pan: 0
        }

        AudioManager.playSe(audio);

    }

    createContenderSprite() {
        this.contenderSprite = new Sprite();
        this.contenderSprite.x = 0;
        this.contenderSprite.y = 0;

        this.contenderSprite.bitmap = ImageManager.loadCCB($gameSystem.contenderSpriteName);

        this.addChild(this.contenderSprite);
    }

    update() {
        Scene_Base.prototype.update.call(this);
        if(this.speechTime <= 0) {
            if (this.isTriggered()) {
                SceneManager.push(Scene_CardBattle);
            }
        } else {
            this.speechTime -= 100;
        }
    }

    isTriggered() {
        return Input.isTriggered('ok') || TouchInput.isTriggered();
    }

    terminate() {
        Scene_Base.prototype.terminate.call(this);
        this.removeContenderSprite();
    }

    removeContenderSprite() {
        this.removeChild(this.contenderSprite);
    }
}

class Scene_CardBattleEX extends Scene_Base {
    constructor() {
        super();
        this.currentPhase = 'Trade Phase';
        this.playerDrawCardFinX = 0;
        this.computerDrawCardFinX = 0;
        this.playerDrawFinX = [];
        this.computerDrawFinX = [];
        this.tradeCardsArray = [];
        this.playerCurrentPlayableCards = [];
        this.computerCurrentPlayableCards = [];
        this.currentTradedCard = null;
        this.computerCurrentTradedCard = null;
        this.removeTradedOldCards = false;
        this.removeTradedCardCounter = 30;
        this.playerDrawCounter = 5;
        this.computerDrawCounter = 5;
        this.drawOnce = false;
        this.cName = '';
        this.cId = 0;
    }

    setPhase(phase) {
        this.currentPhase = phase;
    }

    setPlayerBackseatCards() {

    }

    drawPlayerCard() {
        var card = new Sprite_Card();
        var bitmap = $gameActors.actor(1).allPlayerCards[this.playerDrawCounter].name;
        var id = $gameActors.actor(1).allPlayerCards[this.playerDrawCounter].id;
        var a = Number($gameActors.actor(1).allPlayerCards[this.playerDrawCounter].meta.alpha);
        var b = Number($gameActors.actor(1).allPlayerCards[this.playerDrawCounter].meta.beta);
        var g = Number($gameActors.actor(1).allPlayerCards[this.playerDrawCounter].meta.gamma);
        var d = Number($gameActors.actor(1).allPlayerCards[this.playerDrawCounter].meta.delta);
        var s = Number($gameActors.actor(1).allPlayerCards[this.playerDrawCounter].meta.sigma);
        card.set(bitmap, id, a, b, g, d, s);

        this.playerDrawCardFinX = 680 + (this.playerCurrentPlayableCards.length * 200);

        card.x = 3000;
        card.y = 1000;
        card.scale.x = 0.5;
        card.scale.y = 0.5;
        card.opacity = 255;



        this.playerCurrentPlayableCards.push(card);

            let cardName = bitmap;
            let cardId = id;

            card.setClickHandler(this.setCardFunction.bind(this, cardName, this.playerDrawCounter-1));

        this.addChildAt(this.playerCurrentPlayableCards[this.playerCurrentPlayableCards.length-1], 35);

        //

        let i = this.computerDrawCounter;

        $gameSystem.computerCards[i].bitmap = ImageManager.loadCCB('CardBack');

        this.computerDrawCardFinX = 680 + (this.computerCurrentPlayableCards.length * 200)

        $gameSystem.computerCards[i].x = -3000;
        $gameSystem.computerCards[i].y = -70;
        $gameSystem.computerCards[i].scale.x = 0.5;
        $gameSystem.computerCards[i].scale.y = 0.5;
        $gameSystem.computerCards[i].opacity = 255;
        this.computerCurrentPlayableCards.push($gameSystem.computerCards[i]);
        this.addChild(this.computerCurrentPlayableCards[this.computerCurrentPlayableCards.length-1]);



        this.setPhase('Standby Phase');
    }

    checkPhase(phase) {
        switch(phase) {
            case 'Trade Phase':
                this.isTradePhase();
                break;
            case 'Draw Phase':
                this.isDrawPhase();
                this.drawOnce = true;
                this.drawPlayerCard();
                break;
            case 'Standby Phase':
                this.isStandbyPhase();
                // this.setPhase('Main Phase 1');
                break;
            case 'Main Phase 1':
                this.isMainPhase1();
                break;
            case 'E Main Phase 1':
                // create think portion for enemy which card it wants to deploy

                // apply random AI function here


                break;
            case 'Battle Phase':
                this.isBattlePhase();
                break;
            case 'Main Phase 2':
                this.isMainPhase2();
                break;
            case 'End Phase':
                this.isEndPhase();
                break;
        }
    }

    isTradePhase() {
        // we are going to turn off all inactive buttons:
        this.drawPhaseButton.opacity = 50;
        this.standbyPhaseButton.opacity = 50;
        this.mainPhase1PhaseButton.opacity = 50;
        this.battlePhaseButton.opacity = 50;
        this.mainPhase2PhaseButton.opacity = 50;
        this.endPhaseButton.opacity = 50;

        if (this.tradingPhaseButton.opacity >= 255) {
            this.tradingPhaseButton.opacity = 255;
        }  else {
            this.tradingPhaseButton.opacity += 10;
        }   

        // we are going to show a list of current trade list of cards from a card database list:
    }

    isDrawPhase() {
        this.tradingPhaseButton.opacity = 50;
        this.standbyPhaseButton.opacity = 50;
        this.mainPhase1PhaseButton.opacity = 50;
        this.battlePhaseButton.opacity = 50;
        this.mainPhase2PhaseButton.opacity = 50;
        this.endPhaseButton.opacity = 50;

        if (this.drawPhaseButton.opacity >= 255) {
            this.drawPhaseButton.opacity = 255;
        }  else {
            this.drawPhaseButton.opacity += 10;
        }   

    }

    isStandbyPhase() {
        this.drawPhaseButton.opacity = 50;
        this.tradingPhaseButton.opacity = 50;
        this.mainPhase1PhaseButton.opacity = 50;
        this.battlePhaseButton.opacity = 50;
        this.mainPhase2PhaseButton.opacity = 50;
        this.endPhaseButton.opacity = 50;

        if (this.standbyPhaseButton.opacity >= 255) {
            this.standbyPhaseButton.opacity = 255;
        }  else {
            this.standbyPhaseButton.opacity += 10;
        }   
        let a = this.playerCurrentPlayableCards.length-1;
        if(this.playerCurrentPlayableCards[a].x >= this.playerDrawCardFinX) {
            this.playerCurrentPlayableCards[a].x -= 50;
            
           
        }
        let b = this.computerCurrentPlayableCards.length - 1;
           if(this.computerCurrentPlayableCards[b].x <= this.computerDrawCardFinX) {
                this.computerCurrentPlayableCards[b].x += 50;
            } else {
                this.computerCurrentPlayableCards[b] = this.computerDrawCardFinX;
            }  

        
        if (z <= 100) {
            z++;
        } else {
            this.setPhase('Main Phase 1');
        }
        
    }

    isMainPhase1() {
        this.drawPhaseButton.opacity = 50;
        this.standbyPhaseButton.opacity = 50;
        this.tradingPhaseButton.opacity = 50;
        this.battlePhaseButton.opacity = 50;
        this.mainPhase2PhaseButton.opacity = 50;
        this.endPhaseButton.opacity = 50;

        if (this.mainPhase1PhaseButton.opacity >= 255) {
            this.mainPhase1PhaseButton.opacity = 255;
        }  else {
            this.mainPhase1PhaseButton.opacity += 10;
        }   

    }

    isBattlePhase() {
        this.drawPhaseButton.opacity = 50;
        this.standbyPhaseButton.opacity = 50;
        this.mainPhase1PhaseButton.opacity = 50;
        this.tradingPhaseButton.opacity = 50;
        this.mainPhase2PhaseButton.opacity = 50;
        this.endPhaseButton.opacity = 50;
        if (this.battlePhaseButton.opacity >= 255) {
            this.battlePhaseButton.opacity = 255;
        }  else {
            this.battlePhaseButton.opacity += 10;
        }         
    }

    isMainPhase2() {
        this.drawPhaseButton.opacity = 50;
        this.standbyPhaseButton.opacity = 50;
        this.mainPhase1PhaseButton.opacity = 50;
        this.battlePhaseButton.opacity = 50;
        this.tradingPhaseButton.opacity = 50;
        this.endPhaseButton.opacity = 50;
        if (this.mainPhase2PhaseButton.opacity >= 255) {
            this.mainPhase2PhaseButton.opacity = 255;
        }  else {
            this.mainPhase2PhaseButton.opacity += 10;
        }        
    }

    isEndPhase() {
        this.drawPhaseButton.opacity = 50;
        this.standbyPhaseButton.opacity = 50;
        this.mainPhase1PhaseButton.opacity = 50;
        this.battlePhaseButton.opacity = 50;
        this.mainPhase2PhaseButton.opacity = 50;
        this.tradingPhaseButton.opacity = 50;
        if (this.endPhaseButton.opacity >= 255) {
            this.endPhaseButton.opacity = 255;
        }  else {
            this.endPhaseButton.opacity += 10;
        }
    }

    initialize() {
        Scene_Base.prototype.initialize.call(this);
    }

    create() {
        Scene_Base.prototype.create.call(this);
        this.setAllPlayerCards();
        this.createGameBoardBackground();
        this.createUpperTrapMagicCardImages();
        this.createLowerTrapMagicCardImages();
        this.createUpperMonsterCardImages();
        this.createLowerMonsterCardImages();
        this.createPlayerFaceButton();
        this.createPlayerFaceButton();
        this.createPlayerStatusWindow();
        this.createComputerStatusWindow();
        this.createComputerFaceButton();
        this.createAllPhaseButtons();
        
        this.createAllPlayerCards();
        this.createAllTradeButtons();
        this.createCurrentPhaseBanner();
        
        this.createDescriptionSprite();
        this.createCardFunctionWindow();
        this.createCardDeployFunctionWindow();
    }

    createDescriptionSprite() {
        this.descSprite = new Sprite_Button();
        this.descSprite.setClickHandler(this.closeDescSprite.bind(this));
    }

    closeDescSprite() {
        this.removeChild(this.descSprite);
    }

    createCardFunctionWindow(){
        this.cardOptionWindow = new Window_CardFunction();
        this.cardOptionWindow.setHandler('description',      this.commandDesc.bind(this, this.cName, this.cId));
        this.cardOptionWindow.setHandler('deploy',      this.commandDeploy.bind(this, this.cName, this.cId));
        this.cardOptionWindow.close();
        this.addChild(this.cardOptionWindow);
    };

    createCardDeployFunctionWindow(){
        this.cardOptionDeployWindow = new Window_DeployFunction();
        this.cardOptionDeployWindow.setHandler('alpha',      this.commandAlphaDeploy.bind(this));
        this.cardOptionDeployWindow.setHandler('beta',      this.commandBetaDeploy.bind(this));
        this.cardOptionDeployWindow.setHandler('gamma',      this.commandGammaDeploy.bind(this));
        this.cardOptionDeployWindow.setHandler('delta',      this.commandDeltaDeploy.bind(this));
        this.cardOptionDeployWindow.setHandler('sigma',      this.commandSigmaDeploy.bind(this));
        this.cardOptionDeployWindow.close();
        this.addChild(this.cardOptionDeployWindow);
    };

    commandAlphaDeploy() {
        this.playerCurrentPlayableCards[this.cId].x = this.lowerMonsterCard1.x;
        this.playerCurrentPlayableCards[this.cId].y = this.lowerMonsterCard1.y;
        this.playerCurrentPlayableCards[this.cId].scale.x = 0.6;
        this.playerCurrentPlayableCards[this.cId].scale.y = 0.6;   
        this.cardOptionDeployWindow.activate();
        this.cardOptionDeployWindow.close();
    }    
    commandBetaDeploy() {
        this.playerCurrentPlayableCards[this.cId].x = this.lowerMonsterCard1.x;
        this.playerCurrentPlayableCards[this.cId].y = this.lowerMonsterCard1.y;
        this.playerCurrentPlayableCards[this.cId].scale.x = 0.6;
        this.playerCurrentPlayableCards[this.cId].scale.y = 0.6;  
        this.cardOptionDeployWindow.activate();
        this.cardOptionDeployWindow.close();        
    }  
    commandGammaDeploy() {
        this.playerCurrentPlayableCards[this.cId].x = this.lowerMonsterCard2.x;
        this.playerCurrentPlayableCards[this.cId].y = this.lowerMonsterCard2.y;
        this.playerCurrentPlayableCards[this.cId].scale.x = 0.6;
        this.playerCurrentPlayableCards[this.cId].scale.y = 0.6;  
        this.cardOptionDeployWindow.activate();
        this.cardOptionDeployWindow.close();        
    }  
    commandDeltaDeploy() {
        this.playerCurrentPlayableCards[this.cId].x = this.lowerMonsterCard3.x;
        this.playerCurrentPlayableCards[this.cId].y = this.lowerMonsterCard3.y;
        this.playerCurrentPlayableCards[this.cId].scale.x = 0.6;
        this.playerCurrentPlayableCards[this.cId].scale.y = 0.6;  
        this.cardOptionDeployWindow.activate();
        this.cardOptionDeployWindow.close();        
    }          
    commandSigmaDeploy() {
        this.playerCurrentPlayableCards[this.cId].x = this.lowerMonsterCard3.x;
        this.playerCurrentPlayableCards[this.cId].y = this.lowerMonsterCard3.y;
        this.playerCurrentPlayableCards[this.cId].scale.x = 0.6;
        this.playerCurrentPlayableCards[this.cId].scale.y = 0.6;  

        this.cardOptionDeployWindow.activate();
        this.cardOptionDeployWindow.close();

    } 
    commandDesc(cardName, cardId) {
        this.descSprite.bitmap = ImageManager.loadCCB(this.cName + ' Description');
        this.addChild(this.descSprite);
        this.cardOptionWindow.activate();
    }

    commandDeploy(cardName, cardId) {
        //show portions of options where the card should go:
        this.cardOptionDeployWindow.x = this.cardOptionWindow.x;
        this.cardOptionDeployWindow.y = this.cardOptionWindow.y;
        this.cardOptionWindow.close();
        this.cardOptionDeployWindow.open();
        


        
    }


    createUpperTrapMagicCardImages() {
        this.upTrapMagic1 = new Sprite();
        this.upTrapMagic1.bitmap = ImageManager.loadCCB('CardBack');
        this.upTrapMagic1.x = 680;
        this.upTrapMagic1.y = 100;

        this.upTrapMagic1.scale.x = 0.6;
        this.upTrapMagic1.scale.y = 0.6;

        this.addChild(this.upTrapMagic1);

        this.upTrapMagic2 = new Sprite();
        this.upTrapMagic2.bitmap = ImageManager.loadCCB('CardBack');

        this.upTrapMagic2.x = 880;
        this.upTrapMagic2.y = 100;

        this.upTrapMagic2.scale.x = 0.6;
        this.upTrapMagic2.scale.y = 0.6;

        this.addChild(this.upTrapMagic2);

        this.upTrapMagic3 = new Sprite();
        this.upTrapMagic3.bitmap = ImageManager.loadCCB('CardBack');


        this.upTrapMagic3.x = 1080;
        this.upTrapMagic3.y = 100;

        this.upTrapMagic3.scale.x = 0.6;
        this.upTrapMagic3.scale.y = 0.6;

        this.addChild(this.upTrapMagic3);

        this.upTrapMagic4 = new Sprite();
        this.upTrapMagic4.bitmap = ImageManager.loadCCB('CardBack');

        this.upTrapMagic4.x = 1280;
        this.upTrapMagic4.y = 100;

        this.upTrapMagic4.scale.x = 0.6;
        this.upTrapMagic4.scale.y = 0.6;

        this.addChild(this.upTrapMagic4);

        this.upTrapMagic5 = new Sprite();
        this.upTrapMagic5.bitmap = ImageManager.loadCCB('CardBack');

        this.upTrapMagic5.x = 1480;
        this.upTrapMagic5.y = 100;

        this.upTrapMagic5.scale.x = 0.6;
        this.upTrapMagic5.scale.y = 0.6;

        this.addChild(this.upTrapMagic5);        

    }

    createLowerTrapMagicCardImages() {
        this.lowerTrapMagic1 = new Sprite();
        this.lowerTrapMagic1.bitmap = ImageManager.loadCCB('CardBack');
        this.lowerTrapMagic1.x = 680;
        this.lowerTrapMagic1.y = 770;

        this.lowerTrapMagic1.scale.x = 0.6;
        this.lowerTrapMagic1.scale.y = 0.6;

        this.addChild(this.lowerTrapMagic1);

        this.lowerTrapMagic2 = new Sprite();
        this.lowerTrapMagic2.bitmap = ImageManager.loadCCB('CardBack');

        this.lowerTrapMagic2.x = 880;
        this.lowerTrapMagic2.y = 770;

        this.lowerTrapMagic2.scale.x = 0.6;
        this.lowerTrapMagic2.scale.y = 0.6;

        this.addChild(this.lowerTrapMagic2);

        this.lowerTrapMagic3 = new Sprite();
        this.lowerTrapMagic3.bitmap = ImageManager.loadCCB('CardBack');


        this.lowerTrapMagic3.x = 1080;
        this.lowerTrapMagic3.y = 770;

        this.lowerTrapMagic3.scale.x = 0.6;
        this.lowerTrapMagic3.scale.y = 0.6;

        this.addChild(this.lowerTrapMagic3);

        this.lowerTrapMagic4 = new Sprite();
        this.lowerTrapMagic4.bitmap = ImageManager.loadCCB('CardBack');

        this.lowerTrapMagic4.x = 1280;
        this.lowerTrapMagic4.y = 770;

        this.lowerTrapMagic4.scale.x = 0.6;
        this.lowerTrapMagic4.scale.y = 0.6;

        this.addChild(this.lowerTrapMagic4);

        this.lowerTrapMagic5 = new Sprite();
        this.lowerTrapMagic5.bitmap = ImageManager.loadCCB('CardBack');

        this.lowerTrapMagic5.x = 1480;
        this.lowerTrapMagic5.y = 770;

        this.lowerTrapMagic5.scale.x = 0.6;
        this.lowerTrapMagic5.scale.y = 0.6;

        this.addChild(this.lowerTrapMagic5);

    }

    createUpperMonsterCardImages() {
        this.upperMonsterCard1 = new Sprite();
        this.upperMonsterCard1.bitmap = ImageManager.loadCCB('CardBack');
        this.upperMonsterCard1.x = 680;
        this.upperMonsterCard1.y = 300;

        this.upperMonsterCard1.scale.x = 0.6;
        this.upperMonsterCard1.scale.y = 0.6;

        this.addChild(this.upperMonsterCard1);

        this.upperMonsterCard2 = new Sprite();
        this.upperMonsterCard2.bitmap = ImageManager.loadCCB('CardBack');
        this.upperMonsterCard2.x = 880;
        this.upperMonsterCard2.y = 300;

        this.upperMonsterCard2.scale.x = 0.6;
        this.upperMonsterCard2.scale.y = 0.6;

        this.addChild(this.upperMonsterCard2);

        this.upperMonsterCard3 = new Sprite();
        this.upperMonsterCard3.bitmap = ImageManager.loadCCB('CardBack');
        this.upperMonsterCard3.x = 1080;
        this.upperMonsterCard3.y = 300;

        this.upperMonsterCard3.scale.x = 0.6;
        this.upperMonsterCard3.scale.y = 0.6;

        this.addChild(this.upperMonsterCard3);


        this.upperMonsterCard4 = new Sprite();
        this.upperMonsterCard4.bitmap = ImageManager.loadCCB('CardBack');
        this.upperMonsterCard4.x = 1280;
        this.upperMonsterCard4.y = 300;

        this.upperMonsterCard4.scale.x = 0.6;
        this.upperMonsterCard4.scale.y = 0.6;

        this.addChild(this.upperMonsterCard4);

        this.upperMonsterCard5 = new Sprite();
        this.upperMonsterCard5.bitmap = ImageManager.loadCCB('CardBack');
        this.upperMonsterCard5.x = 1480;
        this.upperMonsterCard5.y = 300;

        this.upperMonsterCard5.scale.x = 0.6;
        this.upperMonsterCard5.scale.y = 0.6;

        this.addChild(this.upperMonsterCard5);
    }

    createLowerMonsterCardImages() {
        this.lowerMonsterCard1 = new Sprite();
        this.lowerMonsterCard1.bitmap = ImageManager.loadCCB('CardBack');
        this.lowerMonsterCard1.x = 680;
        this.lowerMonsterCard1.y = 550;

        this.lowerMonsterCard1.scale.x = 0.6;
        this.lowerMonsterCard1.scale.y = 0.6;

        this.addChild(this.lowerMonsterCard1);

        this.lowerMonsterCard2 = new Sprite();
        this.lowerMonsterCard2.bitmap = ImageManager.loadCCB('CardBack');
        this.lowerMonsterCard2.x = 880;
        this.lowerMonsterCard2.y = 550;

        this.lowerMonsterCard2.scale.x = 0.6;
        this.lowerMonsterCard2.scale.y = 0.6;

        this.addChild(this.lowerMonsterCard2);

        this.lowerMonsterCard3 = new Sprite();
        this.lowerMonsterCard3.bitmap = ImageManager.loadCCB('CardBack');
        this.lowerMonsterCard3.x = 1080;
        this.lowerMonsterCard3.y = 550;

        this.lowerMonsterCard3.scale.x = 0.6;
        this.lowerMonsterCard3.scale.y = 0.6;

        this.addChild(this.lowerMonsterCard3);


        this.lowerMonsterCard4 = new Sprite();
        this.lowerMonsterCard4.bitmap = ImageManager.loadCCB('CardBack');
        this.lowerMonsterCard4.x = 1280;
        this.lowerMonsterCard4.y = 550;

        this.lowerMonsterCard4.scale.x = 0.6;
        this.lowerMonsterCard4.scale.y = 0.6;

        this.addChild(this.lowerMonsterCard4);

        this.lowerMonsterCard5 = new Sprite();
        this.lowerMonsterCard5.bitmap = ImageManager.loadCCB('CardBack');
        this.lowerMonsterCard5.x = 1480;
        this.lowerMonsterCard5.y = 550;

        this.lowerMonsterCard5.scale.x = 0.6;
        this.lowerMonsterCard5.scale.y = 0.6;

        this.addChild(this.lowerMonsterCard5);
    }

    createAllTradeButtons() {
        this.playerTradeButton = new Sprite_Button();
        this.playerTradeButton.bitmap = ImageManager.loadCCB('Trade Button');
        this.playerTradeButton.setClickHandler(this.playerToTrade.bind(this));
        this.playerTradeButton.x = 80;
        this.playerTradeButton.y = 600;
        this.addChild(this.playerTradeButton);

        this.computerTradeButton = new Sprite_Button();
        this.computerTradeButton.bitmap = ImageManager.loadCCB('Trade Button');
        this.computerTradeButton.setClickHandler(this.playerToTrade.bind(this));
        this.computerTradeButton.x = 80;
        this.computerTradeButton.y = 200;
        this.addChild(this.computerTradeButton);

    }

    playerToTrade() {
        // checks available list of tradable cards:
        if(this.currentPhase === 'Trade Phase') {
            // create all tradable cards:
            let lineWidth = 450;
            for (let tc = 0; tc < $gameActors.actor(1).allTradableCards.length; tc++) {
                let tradeCard = new Sprite_TradeCard();
                let cardName = $gameActors.actor(1).allPlayerCards[tc].name;
                tradeCard.setId($gameActors.actor(1).allPlayerCards[tc].id);
                tradeCard.bitmap = ImageManager.loadCCBCards(cardName);
                tradeCard.x = lineWidth + (tc * 270);
                tradeCard.y = 200;
                tradeCard.setClickHandler(this.tradeCardTHIS.bind(this, tradeCard.tradeId));
                this.tradeCardsArray.push(tradeCard);
                this.addChild(this.tradeCardsArray[tc]);
            }
        }
    }

    tradeCardTHIS(id) {
        this.currentTradedCard = id;
        let tradedCard = new Sprite_TradeCard();
        let tradedCardName = $dataItems[this.currentTradedCard].name;
        tradedCard.bitmap = ImageManager.loadCCBCards(tradedCardName);
        
        tradedCard.x = this.playerTradeButton.x;
        tradedCard.y = this.playerTradeButton.y;

        this.addChild(tradedCard);
        this.removeChild(this.playerTradeButton);

        for (let x = 0; x < this.tradeCardsArray.length; x++) {
            if(this.tradeCardsArray[x].tradeId === id) {
                let a = this.tradeCardsArray[x].x;
                let b = this.tradeCardsArray[x].y;
                this.animateCard(a, b, 41, true, 0, false, true);
                this.removeTradedOldCards = true;
                
            }
        }

        let x2 = this.playerTradeButton.x + 100; let y2 = this.playerTradeButton.y + 100;
        this.animateCard(x2, y2, 120, true, 0, false, true);
        MintyyWorks.CardBattle.CardOKSe();

        this.computerSetTradeCard();

        // this is where we do the drawing:

        this.drawPlayerFirstFiveCards();
        this.drawComputerFirstFiveCards();

        this.setPhase('Draw Phase');

    }

    drawPlayerFirstFiveCards() {
        let limit = 5;
        for (let i = 0; i < $gameActors.actor(1).allPlayerCards.length; i++) {
            if(i === limit) {break;}
            var card = new Sprite_Card();
            var bitmap = $gameActors.actor(1).allPlayerCards[i].name;
            var id = $gameActors.actor(1).allPlayerCards[i].id;
            var a = Number($gameActors.actor(1).allPlayerCards[i].meta.alpha);
            var b = Number($gameActors.actor(1).allPlayerCards[i].meta.beta);
            var g = Number($gameActors.actor(1).allPlayerCards[i].meta.gamma);
            var d = Number($gameActors.actor(1).allPlayerCards[i].meta.delta);
            var s = Number($gameActors.actor(1).allPlayerCards[i].meta.sigma);
            card.set(bitmap, id, a, b, g, d, s);

            let finX = 680 + (i * 200);
            this.playerDrawFinX.push(finX);

            card.x = 3000;
            card.y = 1000;
            card.scale.x = 0.5;
            card.scale.y = 0.5;
            card.opacity = 255;

            let cardName = $gameActors.actor(1).allPlayerCards[i].name;
            let cardId = i;

            card.setClickHandler(this.setCardFunction.bind(this, cardName, cardId));

            this.playerCurrentPlayableCards.push(card);
            remove($gameActors.actor(1).allPlayerCards, i);
            this.addChildAt(this.playerCurrentPlayableCards[i], 20);
        }
        this.playerDrawCounter++;
        this.computerDrawCounter += 1;
    };

    setCardFunction(cardName, cardId) {
        this.cName = cardName; // this will be the bitmap set for the card function
        this.cId = cardId; // this will be the id detected to set the x and y of the window
        this.cardOptionWindow.x = this.playerCurrentPlayableCards[this.cId].x;
        this.cardOptionWindow.y = this.playerCurrentPlayableCards[this.cId].y - 130;
        this.cardOptionWindow.open();
        
    }

    drawComputerFirstFiveCards() {
        let limit = 5;
        for (let i = 0; i < $gameSystem.computerCards.length; i++) {
            if(i === limit) {break;}
            $gameSystem.computerCards[i].bitmap = ImageManager.loadCCB('CardBack');

            let finX = 680 + (i * 200);
            this.computerDrawFinX.push(finX);

            $gameSystem.computerCards[i].x = -3000;
            $gameSystem.computerCards[i].y = -70;
            $gameSystem.computerCards[i].scale.x = 0.5;
            $gameSystem.computerCards[i].scale.y = 0.5;
            $gameSystem.computerCards[i].opacity = 255;
            this.computerCurrentPlayableCards.push($gameSystem.computerCards[i]);
            remove($gameSystem.computerCards, i);
            this.addChildAt(this.computerCurrentPlayableCards[i], 20);
        }
    }    

    computerSetTradeCard() {
        let ct = Math.randomInt($gameSystem.computerCards.length)+1;
        let tradedCard = new Sprite_TradeCard();
        let tradedCardName = $dataItems[ct].name;
        tradedCard.bitmap = ImageManager.loadCCBCards(tradedCardName);

        tradedCard.x = this.computerTradeButton.x;
        tradedCard.y = this.computerTradeButton.y;



        this.addChild(tradedCard);
        this.removeChild(this.computerTradeButton);

        for (let x = 0; x < $gameSystem.computerCards.length; x++) {
            if($gameSystem.computerCards[x].tradeId === ct) {
                let a = $gameSystem.computerCards[x].x;
                let b = $gameSystem.computerCards[x].y;
                this.animateCard(a, b, 115, true, 0, false, true);
            }
        }

        let x2 = this.computerTradeButton.x + 100; let y2 = this.computerTradeButton.y + 100;
        this.animateCard(x2, y2, 120, true, 0, false, true);
        MintyyWorks.CardBattle.CardOKSe();
    }

    animateCard(x, y, id, mirror, delay, wait, dump) {
        var sprite = new Sprite_Base();
        var animId = id;

        sprite.anim = $dataAnimations[animId];
        sprite.x = x;
        sprite.y = y;
        sprite.mirror = mirror;
        sprite.delay = 10;
        sprite.waitFor = wait;
        sprite.dump = dump;
            if(SceneManager._scene){  
                SceneManager._scene.addChild(sprite);
                sprite.startAnimation(sprite.anim, sprite.mirror, sprite.delay);
            }   
    }



    createAllPlayerCards() {
        let tradeCard = 0;
        for (let card = 0; card < $gameActors.actor(1).allPlayerCards.length; card++) {
            var cardName = String($gameActors.actor(1).allPlayerCards[card].name);
            var cardAttack = Number($gameActors.actor(1).allPlayerCards[card].meta.attack);
            var cardDefense = Number($gameActors.actor(1).allPlayerCards[card].meta.defense);
            var cardAnim = Number($gameActors.actor(1).allPlayerCards[card].meta.animation);
            var cardEffect = Number($gameActors.actor(1).allPlayerCards[card].meta.effect);
            var cardElement = String($gameActors.actor(1).allPlayerCards[card].meta.element);

            // let c = new Sprite_Card();
            // c.set(cardName, cardAttack, cardDefense, cardAnim, cardEffect, cardElement);
            // c.setClickHandler(this.cardAction.bind(this));
            // c.x = 80;
            // c.y = 600;
            // this.addChild(c);
        }
    }

    cardAction() {

    }

    setAllPlayerCards() {
        // we are going to determine all the items we have and that is what we are going 
        // to make as the card.

        for (let cards = 0; cards < $gameParty.items().length; cards++) {
            /* we are going to direct them as values of the cards the player has
            * in his his deck.
            */
            $gameActors.actor(1).allPlayerCards.push($gameParty.items()[cards]);
        } 
    }

    createCurrentPhaseBanner() {
        this.currentPhaseBanner = new Sprite_Button();
        this.currentPhaseBanner.bitmap = ImageManager.loadCCB('Phase0Banner');
        this.currentPhaseBanner.setClickHandler(this.confirmPhase0.bind(this));
        this.currentPhaseBanner.opacity = 255;
        this.addChild(this.currentPhaseBanner);
    }

    confirmPhase0() {
        this.removeChild(this.currentPhaseBanner);
        this.startTradingPhase();
    }
    
    startTradingPhase() {
        MintyyWorks.CardBattle.CardSetupBGM();
    }

    checkAnimateCurrentPhase() {
        for (let i = 0; i < this.playerCurrentPlayableCards.length; i++) {
            if(this.playerCurrentPlayableCards[i].x >= this.playerDrawFinX[i]) {
                if(this.currentPhase != 'Main Phase 1') {
                    this.playerCurrentPlayableCards[i].x-=50;
                }
                
            }
        }

        for (let j = 0; j < this.computerCurrentPlayableCards.length; j++) {
            if(this.computerCurrentPlayableCards[j].x <= this.computerDrawFinX[j]) {
                if(this.currentPhase != 'Main Phase 1') {
                    this.computerCurrentPlayableCards[j].x+=50;
                }
                
            } 
        }
    }

    update() {
        Scene_Base.prototype.update.call(this);
        this.checkPhase(this.currentPhase);
        this.tradingPhaseButton.setClickHandler(this.setPhase0.bind(this));
        this.standbyPhaseButton.setClickHandler(this.setPhase1.bind(this));
        this.drawPhaseButton.setClickHandler(this.setPhase2.bind(this));
        this.mainPhase1PhaseButton.setClickHandler(this.setPhase3.bind(this));
        this.battlePhaseButton.setClickHandler(this.setPhase4.bind(this));
        this.mainPhase2PhaseButton.setClickHandler(this.setPhase5.bind(this));
        this.endPhaseButton.setClickHandler(this.setPhase6.bind(this));

        this.animateCurrentPhaseBanner();

        this.checkAnimateCurrentPhase();


        // all functions that work per phase 

        if (this.removeTradedOldCards) {
            if (this.removeTradedCardCounter <= 0) {
                for (let x = 0; x < this.tradeCardsArray.length; x++) {
                    this.removeChild(this.tradeCardsArray[x]);
                }
            } else {
                this.removeTradedCardCounter--;
            }
        }

    }

    animateCurrentPhaseBanner() {
        if (this.currentPhaseBanner) {
            if (this.currentPhaseBanner.opacity <= 255) {
                this.currentPhaseBanner.opacity += 10;
            }
        }
    }

    createAllPhaseButtons() {
        // trading phase button 
        this.tradingPhaseButton = new Sprite_Button();
        this.tradingPhaseButton.bitmap = ImageManager.loadCCB('Phase0');
        this.tradingPhaseButton.x = 360;
        this.tradingPhaseButton.y = 200;
        this.addChild(this.tradingPhaseButton);

        // Draw Phase
        this.drawPhaseButton = new Sprite_Button();
        this.drawPhaseButton.bitmap = ImageManager.loadCCB('Phase1');
        this.drawPhaseButton.x = 360;
        this.drawPhaseButton.y = 300;
        this.addChild(this.drawPhaseButton); 

        // Standby Phase
        this.standbyPhaseButton = new Sprite_Button();
        this.standbyPhaseButton.bitmap = ImageManager.loadCCB('Phase2');
        this.standbyPhaseButton.x = 360;
        this.standbyPhaseButton.y = 400;
        this.addChild(this.standbyPhaseButton);             

        // Main Phase 1
        this.mainPhase1PhaseButton = new Sprite_Button();
        this.mainPhase1PhaseButton.bitmap = ImageManager.loadCCB('Phase3');
        this.mainPhase1PhaseButton.x = 360;
        this.mainPhase1PhaseButton.y = 500;
        this.addChild(this.mainPhase1PhaseButton); 

        // Battle Phase 
        this.battlePhaseButton = new Sprite_Button();
        this.battlePhaseButton.bitmap = ImageManager.loadCCB('Phase4');
        this.battlePhaseButton.x = 360;
        this.battlePhaseButton.y = 600;
        this.addChild(this.battlePhaseButton); 

        //Main Phase 2
        this.mainPhase2PhaseButton = new Sprite_Button();
        this.mainPhase2PhaseButton.bitmap = ImageManager.loadCCB('Phase5');
        this.mainPhase2PhaseButton.x = 360;
        this.mainPhase2PhaseButton.y = 700;
        this.addChild(this.mainPhase2PhaseButton); 

        //End Phase
        this.endPhaseButton = new Sprite_Button();
        this.endPhaseButton.bitmap = ImageManager.loadCCB('Phase6');
        
        this.endPhaseButton.x = 360;
        this.endPhaseButton.y = 800;
        this.addChild(this.endPhaseButton);         
    }

    setPhase0() {this.setPhase('Trade Phase')};
    setPhase1() {this.setPhase('Draw Phase')};
    setPhase2() {this.setPhase('Standby Phase')};
    setPhase3() {this.setPhase('Main Phase 1')};
    setPhase4() {this.setPhase('Battle Phase')};
    setPhase5() {this.setPhase('Main Phase 2')};
    setPhase6() {this.setPhase('End Phase')};
    
    

    createGameBoardBackground() {
        this.gameboardbg = new Sprite();
        this.gameboardbg.bitmap = ImageManager.loadCCB('Sample_Background');
        this.addChild(this.gameboardbg);
    }

    createPlayerFaceButton() {
        this.playerFaceButton = new Sprite_Button();
        this.playerFaceButton.bitmap = ImageManager.loadCCB($gameSystem.playerName);
        this.playerFaceButton.x = 0;
        this.playerFaceButton.y = 0;
        this.addChild(this.playerFaceButton);
    }


    createPlayerStatusWindow() {
        this.playerStatus = new Window_PlayerVitality();
        this.playerStatus.x = MintyyWorks.CardBattle.WindowSetup('Player Window X');
        this.playerStatus.y = MintyyWorks.CardBattle.WindowSetup('Player Window Y');	
        this.playerStatus.opacity = MintyyWorks.CardBattle.WindowSetup('Player Window O');
        this.addChild(this.playerStatus);
    }

    createComputerFaceButton() {
        this.computerFaceButton = new Sprite_Button();
        this.computerFaceButton.bitmap = ImageManager.loadCCB($gameSystem.computerName);
        this.computerFaceButton.x = 0;
        this.computerFaceButton.y = 930;
        this.addChild(this.computerFaceButton);
    }    

    createComputerStatusWindow() {
        this.computerStatus = new Window_EnemyVitality();
        this.computerStatus.x = MintyyWorks.CardBattle.WindowSetup('Computer Window X');
        this.computerStatus.y = MintyyWorks.CardBattle.WindowSetup('Computer Window Y');
        this.computerStatus.opacity = MintyyWorks.CardBattle.WindowSetup('Computer Window O');
        this.addChild(this.computerStatus);
    }
    

}