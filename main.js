const  electron = require('electron')

const{app,BrowserWindow,Tray,Menu,ipcMain,Notification} = electron

let win
let tray
let notification
app.on('ready',()=>{
    if(process.platform=='darwin'){
        app.dock.hide()
    }
    win = new BrowserWindow({
        height:500,
        width:400,
        webPreferences:{
            nodeIntegration:true
        },
        frame:false,
        resizable:false,
        skipTaskbar:true
    })
    win.hide()
    win.loadFile('index.html')
    tray = new Tray('images/iconTemplate.png')
    tray.setToolTip('Tray Music')

    tray.on('click',(event,bounds)=>{

        if(win.isVisible()){
            win.hide()
        }else {
            win.show()






        }
    })
    tray.on('right-click',()=>{
        let template = [{
            role:'quit'
        }]
        const menu = Menu.buildFromTemplate(template)
        tray.popUpContextMenu(menu)
    })
    win.on('blur',()=>{
        win.hide()
    })

})

ipcMain.on('playing',(event,song)=>{
    if(Notification.isSupported()){
        notification = new Notification({
            title:"Now playing",
            body:song,
            silent:true
        })
        notification.show()
    }
})