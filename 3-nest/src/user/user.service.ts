import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {

    private users: Map<number,User> = new Map<number,User>();

    constructor(){
        this.populate();
    }

    getAll(){
       var populatedData = [];
       for(const user of this.users.values()){
           populatedData.push(user.toJson());
       }
       return populatedData;
    }

    populate(){
        this.users.set(1,new User(1,"James",18,"james@email.com","123456"));
        this.users.set(2,new User(2,"John",18,"john@email.com","143441"));
        this.users.set(3,new User(3,"Luke",18,"luke@email.com","654321"));
        this.users.set(4,new User(4,"Judas",13,"judas@email.com","696969"));
    }
   
    
   
    getSpecificUser(id:number) {

        for(const user of this.users.values()) {
          let json = user.toJson()
          if(json.id == id) return json;
        }
        
    }
    
    addUser(user:any){
      if(!user.name || !user.password || !user.age || !user.email) return false;
            var newUser: User;
            var generatedID = this.users.size + 1
            newUser = new User(generatedID, user.name, user.age, user.email, user.password);
            this.users.set(generatedID, newUser);
            return true;  
}
    loginUser(user:any) {

    for(const item of this.users.values()) {
      const json = item.getLoginDetails()
    
      if(json.email == user.email) {
         if(json.password == user.password) return true;
         else return false;
      }
    }
    
    return false;
    }
    
    deleteUser(id:number) {
      let to_delete;
      
      for(const [key, value] of this.users.entries()) {
        let json = value.toJson()
      
        if(json.id == id) {
          to_delete = key;
          break;
        }
      }
      
      if(to_delete) {
        if(this.users.delete(to_delete)) return "User deleted";
        else return "User not found";
      }
      
      return "User not found";
      }
        
    putUser(id: number, body: any) {
      if(body.id) return false;
        if(!body.name || !body.email || !body.password || !body.age) 
        return false;
            
        let to_update;
            
        for(const user of this.users.values()) {
              const json = user.toJson();
              if(json.id == id) {
                to_update = json;
                break;
              }
            }
            
        if(!to_update) return false;
            
        this.users.set(+id, new User(+id, body.name, body.age, body.email, body.password));
        return true;
         }
         replaceUser(id:number, body:any) {

          if(Object.keys(body).length < 1) return false;
          
          let to_update;
          
          for(const user of this.users.values()) {
            let json = user.toJson();
            if(json.id == id) {
              to_update = json;
              break;
            }
          }
          
          if(!to_update) return false;
          
          for(const property in body) {
            if(['name', 'age', 'email', 'password'].indexOf(property) == -1) return false;
          
            to_update[property] = body[property];
          }
          
          this.users.set(+id, new User(+id, to_update.name, to_update.age, to_update.email, to_update.password));
          return true;
          }
    searchUser(term:string) {

              const search = term.toLowerCase()
              
              const results = [];
              
              
              for(const user of this.users.values()) {
                let json = (<any>user).toJson();
                console.log(json)
              
                if(json.name.toLowerCase().includes(search)) results.push(json);
                else if (json.email.toLowerCase().includes(search)) results.push(json);
              }
              
              return results;
              }
}