/* Angular imports */
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from '@angular/flex-layout';

/* Angular material imports */
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";

/* Angular tree import */
import { TreeModule } from "angular-tree-component";

/* App components imports */
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";
import { HomeComponent } from "./component/home/home.component";
import { NotFoundComponent } from "./component/not-found/not-found.component";
import { DocsComponent } from "./component/docs/docs.component";
import { ReferenceComponent } from "./component/reference/reference.component";
import { ProjectsComponent } from "./component/projects/projects.component";
import { AbstractViewComponent } from "./component/core/abstract-view.component";
import { PresentationsComponent } from "./component/presentations/presentations.component";
import { MdViewportComponent } from "./component/md-viewport/md-viewport.component";
import { BreadcrumbComponent } from "./component/breadcrumb/breadcrumb.component";

/* App services imports */
import { JecProjectsService } from "./service/jec-projects.service";
import { NavigationService } from "./service/navigation.service";
import { JecReferenceMenuService } from "./service/jec-reference-menu.service";
import { JecMarkdownService } from "./service/jec-markdown.service";
import { VideosComponent } from "./component/videos/videos.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DocsComponent,
    ReferenceComponent,
    ProjectsComponent,
    NotFoundComponent,
    BreadcrumbComponent,
    MdViewportComponent,
    PresentationsComponent,
    VideosComponent
  ],
  imports: [
    /* Angular Module */
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    /* Angular Material Module */
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    /* Angular Tree Module */
    TreeModule,
    /* Routing Module */
    AppRoutingModule
  ],
  providers: [
    JecProjectsService,
    NavigationService,
    JecReferenceMenuService,
    JecMarkdownService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
