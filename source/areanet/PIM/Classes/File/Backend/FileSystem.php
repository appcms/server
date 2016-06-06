<?php
namespace Areanet\PIM\Classes\File\Backend;

use Areanet\PIM\Entity\File;
use Areanet\PIM\Classes\File\BackendInterface;
use Areanet\PIM\Entity\ThumbnailSetting;

class FileSystem implements BackendInterface
{
    public function getPath(File $file)
    {
        if(!is_dir(ROOT_DIR.'/data/files/'.$file->getId())) mkdir(ROOT_DIR.'/data/files/'.$file->getId());
        return ROOT_DIR.'/data/files/'.$file->getId();
    }

    public function getWebPath(File $file)
    {
        if(!is_dir(ROOT_DIR.'/data/files/'.$file->getId())) mkdir(ROOT_DIR.'/data/files/'.$file->getId());
        return '/data/files/'.$file->getId();
    }

    public function getUri(File $file, $size = null)
    {
        $fileName = $file->getName();
        $sizeUri  = '';
        if($size){
            if($size instanceof ThumbnailSetting){
                if($size->getForceJpeg()) {
                    $imgThumbNameList = explode('.', $fileName);
                    $imgThumbNameList[(count($imgThumbNameList) - 1)] = 'jpg';
                    $fileName = implode('.', $imgThumbNameList);
                }
                $sizeUri = $size->getAlias().'-';
            }else{
                $sizeUri = $size.'-';
            }
        }

        if(!is_dir(ROOT_DIR.'/data/files/'.$file->getId())) mkdir(ROOT_DIR.'/data/files/'.$file->getId());

        return ROOT_DIR.'/data/files/'.$file->getId().'/'.$sizeUri.$fileName;
    }

    public function getWebUri(File $file, $size = null)
    {
        $fileName = $file->getName();
        $sizeUri  = '';
        if($size){
            if($size instanceof ThumbnailSetting){
                if($size->getForceJpeg()) {
                    $imgThumbNameList = explode('.', $fileName);
                    $imgThumbNameList[(count($imgThumbNameList) - 1)] = 'jpg';
                    $fileName = implode('.', $imgThumbNameList);
                }
                $sizeUri = $size->getAlias().'/';
            }else{
                $sizeUri = $size.'/';
            }
        }

        return 'files/get/'.$file->getId().'/'.$sizeUri.$fileName;
    }


}