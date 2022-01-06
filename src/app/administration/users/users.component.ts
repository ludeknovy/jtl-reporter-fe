import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/_services/user.service";
import { Users } from "src/app/_services/users.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css", "../administration.css", "../../shared-styles.css"]
})
export class UsersComponent implements OnInit {

  users$: Observable<Users[]>;
  constructor(private usersService: UserService) { }

  ngOnInit() {
    this.users$ = this.usersService.users$;
    this.usersService.loadUsers();
  }

}
