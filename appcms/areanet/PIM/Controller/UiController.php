<?php
namespace Areanet\PIM\Controller;

use Areanet\PIM\Classes\Config;
use Areanet\PIM\Classes\Controller\BaseController;
use Areanet\PIM\Entity\User;

class UiController extends BaseController
{

    public function showAction()
    {
        $uiRoutes = $this->app['uiManager']->getRoutes();

        $jsFilesToInclude = array();
        foreach($uiRoutes as $uiRoute){
            if(substr($uiRoute['controllerName'],0, 8) == '/plugins'){
                $parts              = explode('/', $uiRoute['controllerName']);
                $controllerName     = array_pop($parts);
                $controller         = strtolower(str_replace('Ctrl', '', $controllerName));
                $jsFilesToInclude[] = implode('/', $parts).'/'.$controller.'.controller.js';
            }else{
                $controller         = strtolower(str_replace('Ctrl', '', $uiRoute['controllerName']));
                $jsFilesToInclude[] = '/custom/Frontend/ui/default/scripts/controllers/'.$controller.'.controller.js';
            }
        }

        $jsFiles = $this->app['uiManager']->getJSFiles();
        foreach($jsFiles as $jsFile){
            $jsFilesToInclude[] = $jsFile;
        }

        $dynInlineScript  = 'var APP_VERSION = \''.APP_VERSION.'\';';
        $dynInlineScript .= 'var CUSTOM_VERSION = \''.CUSTOM_VERSION.'\';';
        $dynInlineScript .= "var uiRoutes = ".json_encode($uiRoutes);

        $cssFilesToInclude = array();
        $cssFiles = $this->app['uiManager']->getCSSFiles();
        foreach($cssFiles as $cssFile){
            $cssFilesToInclude[] = $cssFile;
        }


        return $this->app['twig']->render('app.twig', array(
            'app_version'  => APP_VERSION,
            'custom_version'  => CUSTOM_VERSION,
            'script'   => $dynInlineScript,
            'jsFiles'  => $jsFilesToInclude,
            'angularModules'  => $this->app['uiManager']->getAngularModules(),
            'cssFiles' => $cssFilesToInclude,
            'customTypes' => $this->app['typeManager']->getCustomTypes(),
            'pluginTypes' => $this->app['typeManager']->getPluginTypes(),
            'systemTypes' => $this->app['typeManager']->getSystemTypes(),
            'frontend' => array(
                'title' => Config\Adapter::getConfig()->FRONTEND_TITLE,
                'welcome' => Config\Adapter::getConfig()->FRONTEND_WELCOME,
                'customLoginBG' => Config\Adapter::getConfig()->FRONTEND_CUSTOM_LOGIN_BG
            )
        ));
    }
}