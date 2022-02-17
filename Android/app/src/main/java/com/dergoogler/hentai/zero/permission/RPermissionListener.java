package com.dergoogler.hentai.zero.permission;

import java.util.List;

public interface RPermissionListener {

    void onPermissionGranted();

    void onPermissionDenied(List<String> deniedPermissions, int status);

}