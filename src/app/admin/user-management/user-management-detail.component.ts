import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from 'src/app/core';

@Component({
    selector: 'l2l-user-mgmt-detail',
    templateUrl: './user-management-detail.component.html'
})
export class UserMgmtDetailComponent implements OnInit {
    user: User;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
        });
    }
}
