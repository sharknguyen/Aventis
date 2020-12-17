import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
  } from '@angular/forms';
import { AuthSandbox } from '@app/auth/auth.sandbox';
import { BaseComponent } from '@shared/components/base.component';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild
  } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DxPopupComponent } from 'devextreme-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { isArray } from 'util';
import { isObject, tryParseJSON } from '@shared/utilites';
import { Logger } from '@shared/utilites/logger.service';
import { LoginForm } from '@shared/models';
import { RemainingMessageComponent } from '@shared/components/remaining-message/remaining-message.component';
import { Subscription } from 'rxjs';

const log = new Logger('LoginComponent');

@Component({
  selector: 'kiss-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {
  submitted = false;
  popupVisible = false;
  userName: AbstractControl;
  password: AbstractControl;
  loginForm: FormGroup;
  copyRightName: number;
  @ViewChild('remaining') remaining: RemainingMessageComponent;
  @ViewChild('H001_popup') H001_popup: DxPopupComponent;
  listUserPrimaryKey: any;
  displayExpr: string;
  userNameValue: string;
  xUser: any;

  private readonly userNameKey = 'userNameCookie';
  private readonly userLoginKey = 'user:userLogonCookie';

  private subscription: Subscription = new Subscription();

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public authSandbox: AuthSandbox) {
    super(injector);
    this.initLoginForm();
  }

  ngOnInit() {
    const userNameCookie = Cookie.get(this.userNameKey);
    if (userNameCookie) {
      this.userNameValue = userNameCookie;
      localStorage.setItem(this.userLoginKey, userNameCookie);
    }
    this.setTitle('Login');
    this.copyRightName = new Date().getFullYear();
    this.authSandbox.registerAuthEvents();

    this.subscription.add(
      this.authSandbox.getLoginError$.subscribe(error => {
        if (error) {
          this.remaining.showMessage(this.httpCatchError(error));
        } else {
          this.remaining.hideMessage();
        }
      })
    );

    this.authSandbox.LoadMultipleXUsers$.subscribe(dataXUser => {
      if (dataXUser && isArray(dataXUser) && dataXUser.length) {
        if (dataXUser.length > 1) {
          this.listUserPrimaryKey = dataXUser;
          if (this.listUserPrimaryKey.length > 1) {
            this.xUser = this.listUserPrimaryKey[0].logonName;
            this.H001_popup.visible = true;
          }
        } else {
          this.authSandbox.redirectToFallNavigator();
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Builds a form instance (using FormBuilder) with corresponding validation rules
   */
  private initLoginForm(): void {
    const userNameCookie = Cookie.get(this.userNameKey);
    this.loginForm = this.fb.group({
      username: [
        localStorage.getItem('user:userLogon') ?
          localStorage.getItem('user:userLogon') :
          (userNameCookie ? userNameCookie : ''),
        Validators.required],
      password: ['', Validators.required]
    });
    this.userName = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }

  /**
   * Handle error user login failed
   */
  private httpCatchError(error?: HttpErrorResponse): string {
    let message = '';
    if (error) {
      log.debug(error);

      if (error.status === 0) {
        // request timeout
        message = 'request timeout';
      } else {
        const body = tryParseJSON(error['_body']);
        if (Array.isArray(body)) {
          message = body.map(err => err.message).join(',');
        } else if (isObject(body)) {
          message = body['message'] || body['error_description'];
        } else {
          message = body;
        }
      }

    }
    return message;
  }


  /**
   * Handles form 'submit' event. Calls sandbox login function if form is valid.
   *
   * @param event
   * @param form
   */
  public onSubmit(event: Event, form: LoginForm): void {
    event.stopPropagation();
    this.submitted = true;
    const tokens = this.authSandbox.getConfigsToken();
    form.client_id = tokens.client_id;
    form.client_secret = tokens.client_secret;
    form.grant_type = tokens.grant_type;
    form.scope = tokens.scope;

    if (this.loginForm.valid) {
      Cookie.set(this.userNameKey, form.username);
      this.authSandbox.login(form);
    }
  }

  clickOkBenutzer() {
    if (this.xUser) {
      sessionStorage.setItem('user:Xuser', JSON.stringify(this.xUser));
      this.authSandbox.LoadUserRight(this.xUser['userID']);
    }
    this.authSandbox.redirectToFallNavigator();
  }
}
