package com.dergoogler.hentai.zero.requetcode;

public class RequestCode {
    // Mask
    private static final int REQUEST_CODE_MASK = 0x0000FFFF;

    //++ [[START] File Chooser]
    public static final int REQUEST_FILE_CHOOSER_NORMAL   = 0xA101 & REQUEST_CODE_MASK;
    public static final int REQUEST_FILE_CHOOSER_LOLLIPOP = 0xA102 & REQUEST_CODE_MASK;
    //-- [[E N D] File Chooser]

    //++ [[START] Take a picture]
    public static final int REQUEST_TAKE_A_PICTURE = 0xA201 & REQUEST_CODE_MASK;
    //-- [[E N D] Take a picture]

}
