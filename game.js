var game = {
    words:["productive","","refrigerator","absolute","indefinite","monitor","javascript","university","accomplishment","accommodation","generation","desktop","computer","probability","designation","despolyasiya","negotiation"],
    victories: 0,
    defeats:0,
    yourletter:[],
    chances:10,
    unknown:[], 
    comp_choise:function(){
        this.chances = 10
        this.yourletter=[]
        this.unknown=[]
        let random_number =  Math.floor(Math.random()*this.words.length)
        return this.words[random_number]  
    },
    line_generator:function(soz){
        for( let i=0;i<soz.length;i++){
           this.unknown.push("_") 
        } 
    },
    check_letter:function(letter,soz){
        if(soz.indexOf(letter)===-1 && this.yourletter.indexOf(letter)===-1){
            this.chances--
            this.yourletter.push(letter)
        }
        else{
            for(let i=0; i<soz.length; i++){
                if(letter === soz[i]){
                    this.unknown[i] = letter   
                } 
            }
        }
        if(this.yourletter.indexOf(letter)===-1){
            this.yourletter.push(letter)
        } 
    },
    print_result:function(){
        document.querySelector(".victories").innerHTML=this.victories
        document.querySelector(".defeats").innerHTML=this.defeats
        document.querySelector(".chances").innerHTML=this.chances
    }

}
let comp_chosen = game.comp_choise()
game.line_generator(comp_chosen)
for( let i=0; i<game.unknown.length; i++)
{
    document.querySelector(".word").innerHTML += game.unknown[i]+" "
}
game.print_result()
document.onkeydown = function(e)
{
    let my_choise = e.key
    let yoxla=game.check_letter(my_choise,comp_chosen)
    document.querySelector(".result").innerHTML = ""
    document.querySelector(".your_letter").innerHTML = game.yourletter
    //galibiyyet
    if(game.unknown.indexOf("_") ===-1)
    {
        game.victories++
        document.querySelector(".your_letter").innerHTML =''
        document.querySelector(".result").innerHTML = comp_chosen 
        comp_chosen = game.comp_choise()
        game.line_generator(comp_chosen)
        document.querySelector(".word").innerHTML = ''
        document.querySelector(".word").innerHTML =game.unknown     
    }
    //meglubiyyet
    if(game.chances === 0){
        game.defeats++
        document.querySelector(".result").innerHTML = "You lost! Computer choise was " + comp_chosen
        document.querySelector(".your_letter").innerHTML ='' 
        comp_chosen = game.comp_choise()
        game.line_generator(comp_chosen)   
    }
    document.querySelector(".word").innerHTML=""
    for(let i=0;i<game.unknown.length;i++){
        document.querySelector(".word").innerHTML += game.unknown[i]+" "
    }
    game.print_result()
}