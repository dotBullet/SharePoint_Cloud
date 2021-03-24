import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import axios from 'axios';
import * as express from 'express';

import * as strings from 'HelloWorldCommandSetStrings';
import qs from 'qs';
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;

}

const LOG_SOURCE: string = 'HelloWorldCommandSet';


export default class HelloWorldCommandSet extends BaseListViewCommandSet<IHelloWorldCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized HelloWorldCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':
        //Dialog.alert(`${this.properties.sampleTextOne}`);

        const url: string = 'https://msign-test.transsped.ro/csc/v0/oauth2/authorize?response_type=code&client_id=msdiverse&redirect_uri=http://localhost:8080&scope=service';
        const axios = require('axios');
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        
        //window.location.href = 'https://msign-test.transsped.ro/csc/v0/oauth2/authorize?response_type=code&client_id=msdiverse&redirect_uri=http://localhost:8080&scope=service';

        try{
        } catch (exception){
          console.log(exception);
        }
        break;
      
        default:
        throw new Error('Unknown command');
    }
  }
}
