import { Component, ViewChild } from "@angular/core";
import { NavigationService } from "../../service/navigation.service";
import { JecCommunityMenuService } from "../../service/jec-community-menu.service";
import { AbstractViewComponent } from "../core/abstract-view.component";
import { TreeComponent } from "angular-tree-component";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { environment } from '../../../environments/environment';

@Component({
  selector: "app-community",
  templateUrl: "./community.component.html"
})
export class CommunityComponent extends AbstractViewComponent {

  constructor(navigService: NavigationService,
              private _communityMenuService: JecCommunityMenuService,
              private _router: Router,
              private _navigService:NavigationService,
              private _location: Location) {
    super(navigService);
  }

  @ViewChild("navTree") public navTree: TreeComponent;

  public filesPath: string = environment.dataSource + "resources/community/pages";

  public treeData: any[] = null;

  public treeOptions: any = {};

  public mdFileRef: string = null;

  private readonly ROOT_PATH: string = "/community";

  private readonly ANCHOR: string = "#";

  private readonly SLASH: string = "/";

  private _treeDataMap: Map<string, any> = new Map<string, any>();

  private _anchor: string = null;

  private _lastFilePath: string = null;

  public ngOnInit(): void {
    this.routeList = [
      { label: "Home", route: "home" },
      { label: "Community", route: "community" }
    ];
    
    this._communityMenuService.getData().subscribe(result => {
      this.treeData = result.data;
      this.flatten(this.treeData);
      setTimeout(()=> {
        this.navigate(this._router.url);
      }, 0);
    });
  }

  public onActivate(event: any): void {
    const file: string = event.node.data.file;
    const node: any = this.navTree.treeModel.getNodeById(event.node.id);
    if(file) {
      let path: string = this.ROOT_PATH + this.SLASH + file;
      if(this._anchor) path += this.ANCHOR + this._anchor;
      if(this._lastFilePath !== path) {
        this._lastFilePath = path;
        this.setMdFileRef(file);
        this._location.replaceState(path);
      }
    }
    if(!node.isActive) {
      node.toggleActivated();
    }
    if(!node.isExpanded) {
      node.toggleExpanded().ensureVisible();
    }
  }

  public onRendered(event: any): void {
    if(this._anchor) {
      document.getElementById(this._anchor).scrollIntoView();
      this._anchor = null;
    }
  }

  private setMdFileRef(file: string): void {
    this.mdFileRef = file;
  }

  private extractPageRoute(route: string): string {
    let result: string = this.ROOT_PATH;
    if(route !== this.ROOT_PATH) {
      result = route.substr(11);
    } else {
      result = "jec-community";
    }
    return result;
  }

  private flatten(items: any): void {
    items.forEach(item => {
      this._treeDataMap.set(item.file, item);
      if (item.children) {
        this.flatten(item.children);
      }
    });
  }

  private navigate(route: string): void {
    const pageRef: string = this.extractPageRoute(route);
    const routeMap: string[] = pageRef.split(this.ANCHOR);
    this._anchor = routeMap[1];
    const item: any = this._treeDataMap.get(routeMap[0]);
    if(item) {
      this.setMdFileRef(item.file);
      this.navTree.treeModel.getNodeById(item.id)
                            .toggleActivated()
                            .toggleExpanded()
                            .ensureVisible();
    } else {
      this._navigService.navigateTo("/not-found");
    }
  }
}
