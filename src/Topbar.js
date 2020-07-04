import React, { useState } from "react";
import firebase from "./config/firebase";

// セマンティック
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const Topbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);

  const profileOpen = () => {
    setOpenProfile(true);
  };

  const profileClose = () => {
    setOpenProfile(false);
  };
  const configOpen = () => {
    setOpenConfig(true);
  };

  const configClose = () => {
    setOpenConfig(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" style={{ fontFamily: "PMingLiU" }}>
          rinG
        </Typography>

        <div style={{ paddingLeft: 150 }}>
          <div>
            <Button onClick={profileOpen}>
              <Icon className="far fa-user" />
              　プロフィール
            </Button>
            <Dialog
              open={openProfile}
              onClose={profileClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="alert-dialog-title">
                プロフィール編集
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <TextField label="名前" type="text" />
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  <TextField label="生年月日" type="text" />
                </DialogContentText>
                <Button id="alert-dialog-description">アイコン変更</Button>
              </DialogContent>
              <DialogActions>
                <Button onClick={profileClose} color="primary">
                  戻る
                </Button>
                <Button onClick={profileClose} color="primary">
                  決定
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <Button onClick={configOpen}>
            <Icon className="fa fa-tools" />
            　設定
          </Button>
          <Dialog
            open={openConfig}
            onClose={configClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">設定</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <TextField label="メールアドレス変更" type="text" />
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                <TextField label="パスワード変更" type="text" />
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                <TextField label="グループ名変更" type="text" />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={configClose} color="primary">
                戻る
              </Button>
              <Button onClick={configClose} color="primary" autoFocus>
                決定
              </Button>
            </DialogActions>
          </Dialog>

          <Button
            style={{ color: "red" }}
            onClick={() => firebase.auth().signOut()}
          >
            ログアウト
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
