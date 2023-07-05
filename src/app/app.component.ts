import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Set } from 'typescript-collections';
import { forEach } from 'typescript-collections/dist/lib/arrays';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SignalR';

  private connection: HubConnection;

  public messages: string[] = [];
  public connectedUserArray:string[]=[];
  public selectedUser:string="";
  public connectedUser:string[]=[];

  public user: string = '';
  public message: string = '';


  // -- connection --
  constructor() {

    this.connection = new HubConnectionBuilder()
      .withUrl('https://localhost:44341/yourhubpath',{
        skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
      })
      .build();
  }



  async ngOnInit() {


    /*-- UI side listing  --*/
    this.connection.on('ReceiveMessage', (message) => {
      console.warn(message)
      this.messages.push(`${message}`);

    });


  /*-- Get total User Connected --*/

    // this.connection.on('TotalUser', (allUserConnected) => {
    //   this.connectedUser=[];
    //   console.warn(this.connectedUser)
    //     allUserConnected.forEach((element: any) => {
    //     this.connectedUser.push(element)

    //   });
    // });


    /*-- Connection Started  --*/


    try {

      await this.connection.start()
      .then(() =>{
        console.log('Connect to signalR hub');
      });

    } catch (error) {
      console.error('fail to connect to signalR hub', error);
    }


    await this.connection.invoke('SendMessage');

/*-- Connected user (Own user id )  --*/

      // this.connection.on('UserConnected', (ConnectionId)=>{

      //       this.connectedUser.push(ConnectionId);
      // })


/*-- Disconnected user --*/


      // this.connection.on('UserDisconnected', (ConnectionId)=>{

      //   for( var i=0; i<this.connectedUser.length; i++){

      //           let index = this.connectedUser.indexOf(ConnectionId);
      //           if (index > -1) {
      //             this.connectedUser.splice(index, 1);
      //           }
      //   }
      // })

     // this.getTotalmessage()
  }
// -- ENd of onInit--








/*-- send request to get total userConnected --*/

  // async getTotalmessage(){

  //   await this.connection.invoke('TotaluserConnected');

  // }



  /*-- send request to Hub  --*/

  // async sendMessage(user: string, message: string) {
  //   if (!user || !message) return;

  //   if(this.selectedUser == "Privategroup_A"){
  //     await this.connection.invoke('SendMessageToGroup',"Privategroup_A", user, message);
  //   }

  //   else if(this.selectedUser == "Privategroup_B"){
  //     await this.connection.invoke('SendMessageToGroup',"Privategroup_B", user, message);
  //   }
  //   else if(this.selectedUser == "broadcast"){

  //     await this.connection.invoke('askServer', user, message);
  //   }
  //   else{

  //     await this.connection.invoke('SendMessageToUser',this.selectedUser, user, message);
  //     await this.connection.invoke('SendMessageToCaller', user, message);
  //     //console.warn(this.selectedUser);


  //   }
  // }



  /*-- Join group request --*/

  async joingroup_A(){

    await this.connection.invoke('JoinGroup', "Privategroup_A");
  }

  async joingroup_B(){

    await this.connection.invoke('JoinGroup', "Privategroup_B");
  }


}

