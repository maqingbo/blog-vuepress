---
title: '前后端分离 API 接口 AES 加密方案'
---

**场景还原：**页面中需要展示手机号，身份证号，因为是前后端分离，所有接口 API 地址有可能暴露，这样不怀好意的人可以拿到个人敏感信息

**解决方案：**

1.  敏感信息加掩码，例如：接口返回`130******12`这样的手机号。弊端：在有表单中无法实现这种方案。

2.  后端加密，前端解密的方式（本文采用的方式），前后端统一加密方案，`salt`字符串等信息。弊端：前端 js 无法做到高级加密，`salt`可以被查到，但是成本相对较高。

## 技术实现

> 加密方式使用 AES，前端使用`crypto-js`解密，具体加密方案选型请大家自行百度

后端代码：`java`

```Java
package org.ms.test;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

/**
 * @author : R&M www.rmworking.com/blog
 *         2018/1/18 19:21
 *         Test
 *         org.ms.test
 */

public class ClassAesCBC {

  public static void main(String[] args)throws Exception {
    String content = "这是加密内容。";
    // 字符串必须 16 位
    String key = "qnloft.com/blog/";

    System.out.println(encrypt(content, key));
  }
  public static String encrypt(String content, String key)throws Exception {
    try {

      Key keySpec = new SecretKeySpec(key.getBytes(), "AES"); //两个参数，第一个为私钥字节数组， 第二个为加密方式 AES 或者 DES

      String iv = "qnloft.com/ppt/"; //必须为 16 位
      IvParameterSpec ivSpec = new IvParameterSpec(iv.getBytes());

      Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
      cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec);

      byte[] byteResult = cipher.doFinal(content.getBytes());

      StringBuffer sb = new StringBuffer();
      for (int i = 0; i < byteResult.length; i++) {
        String hex = Integer.toHexString(byteResult[i] & 0xFF);
        if (hex.length() == 1) {
          hex = '0' + hex;
        }
        sb.append(hex.toUpperCase());
      }
      return sb.toString();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }
}
```

前端代码：`vue.js`

```JavaScript
import {AES, enc, mode, pad} from 'crypto-js'

var getResultsStr = enc.Hex.parse(response.data.results)
var str = enc.Base64.stringify(getResultsStr)
var decrypted = AES.decrypt(str, enc.Utf8.parse('qnloft.com/blog/'), {
  iv: enc.Utf8.parse('qnloft.com/ppt/'),
  mode: mode.CBC,
  padding: pad.Pkcs7
})
var results = JSON.parse(decrypted.toString(enc.Utf8))
```
