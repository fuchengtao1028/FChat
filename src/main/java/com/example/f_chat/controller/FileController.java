package com.example.f_chat.controller;

import com.example.f_chat.entity.ReturnMsg;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/file")
public class FileController {
    @RequestMapping(value = "/image",method = RequestMethod.POST)
    public ReturnMsg uploadImage(@RequestParam("image") MultipartFile file){
        //获取文件名
        String fileName = file.getOriginalFilename();
        //获取文件后缀名。也可以在这里添加判断语句，规定特定格式的图片才能上传，否则拒绝保存。
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        //为了避免发生图片替换，这里使用了文件名重新生成
        fileName = UUID.randomUUID()+suffixName;

        String path = null;
        try {
            path = ResourceUtils.getURL("classpath:").getPath()+"public/img/";
            file.transferTo(new File(path+fileName));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return  ReturnMsg.success().add("FileName","/img/"+fileName);
    }

    @RequestMapping(value = "/file",method = RequestMethod.POST)
    public ReturnMsg uploadFile(@RequestParam("file") MultipartFile file){
        //获取文件名
        String fileName = file.getOriginalFilename();
        //获取文件后缀名。也可以在这里添加判断语句，规定特定格式的图片才能上传，否则拒绝保存。
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        //为了避免发生图片替换，这里使用了文件名重新生成
        fileName = UUID.randomUUID()+suffixName;

        String path = null;
        try {
            path = ResourceUtils.getURL("classpath:").getPath()+"public/file/";
            file.transferTo(new File(path+fileName));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return  ReturnMsg.success().add("FileName","/file/"+fileName);
    }
}
