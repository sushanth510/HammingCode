import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cbp';
  dataBits: string="";
  checkBits: string="";
  hammingCode:Array<string> = ['0','0','0','0','0','0','0','0'];
  errorhammingCode:Array<string> = ['0','0','0','0','0','0','0','0'];
  hamCode: string="";
  checkMessage: string="";
  position:number=0;
  correctedHamCode:string="";
  c1:number=0;
  c2:number=0;
  c3:number=0;
  canCheck:boolean=false;
  ngOnInit(){
    this.hamCode= "";
  }
   
  getHammingCode(){
    this.canCheck=true;
    this.hamCode="";
    this.hammingCode[1]=this.dataBits[0];
    this.hammingCode[2]=this.dataBits[1];
    this.hammingCode[3]=this.dataBits[2];
    this.hammingCode[5]=this.dataBits[3];
    this.hammingCode[7]=((+(this.hammingCode[5]))^(+(this.hammingCode[3]))^(+(this.hammingCode[1]))).toString();
    this.hammingCode[6]=((+(this.hammingCode[5]))^(+(this.hammingCode[2]))^(+(this.hammingCode[1]))).toString();
    this.hammingCode[4]=((+(this.hammingCode[3]))^(+(this.hammingCode[2]))^(+(this.hammingCode[1]))).toString();
    console.log(this.hammingCode)
    for(let i=1;i<=7;i++){
      this.hamCode=this.hamCode+this.hammingCode[i];
    }
  }

  check(){
    this.correctedHamCode="";
    this.position=0;
    if(this.checkBits.length!=7){
      this.checkMessage="Enter 7-bit Hamming Code";
    }
    else{
      for(let i=1;i<=7;i++){
        this.errorhammingCode[i]=this.checkBits[i-1];
      }
      console.log(this.errorhammingCode);
      this.c1=(+(this.errorhammingCode[7]))^(+(this.errorhammingCode[5]))^(+(this.errorhammingCode[3]))^(+(this.errorhammingCode[1]));
      this.c2=(+(this.errorhammingCode[6]))^(+(this.errorhammingCode[5]))^(+(this.errorhammingCode[2]))^(+(this.errorhammingCode[1]));
      this.c3=(+(this.errorhammingCode[4]))^(+(this.errorhammingCode[3]))^(+(this.errorhammingCode[2]))^(+(this.errorhammingCode[1]));
      this.position=this.c1*1+this.c2*2+this.c3*4;
      console.log(this.position,this.c1,this.c2,this.c3);
      if(this.position==0){
        this.checkMessage="No error detected";
      }
      else{
        this.checkMessage="Error detected at position "+(8-this.position).toString();
      }
    }
    
  }

  correct(){
    
    if(this.errorhammingCode[8-this.position]=='0'){
      this.errorhammingCode[8-this.position]='1';
    }
    else{
      this.errorhammingCode[8-this.position]='0';
    }
    console.log(this.errorhammingCode);
    for(let i=1;i<=7;i++){
      this.correctedHamCode=this.correctedHamCode+this.errorhammingCode[i];
    }

  }

}
