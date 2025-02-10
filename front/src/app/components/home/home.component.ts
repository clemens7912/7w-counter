import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../../auth/components/login-modal/login-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const login = params.get('login') === 'true';
      if(login){
        this.openLoginModal();
      }
    })
  }  

  /**
   * Opens login modal and waits for the user to do some action
   * No matter the action, we clear the url, so if user has not logged in
   * and clicks again, the auth guard redirect works to open the modal again.
   */
  async openLoginModal() {
    const modalRef = this.modalService.open(LoginModalComponent, {size: 'lg', windowClass: 'modal-full-mobile', backdrop: 'static'});

    try{
      await modalRef.result;
    }finally{
      this.router.navigate([], {
        queryParams: { login: null }, // Remove login parameter
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    }
  }
}
