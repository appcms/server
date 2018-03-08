<?php

namespace Areanet\PIM\Classes;


use Areanet\PIM\Controller\ApiController;
use Areanet\PIM\Entity\Base;
use Areanet\PIM\Entity\User;
use Doctrine\ORM\EntityManager;
use Silex\Application;

abstract class Type
{
    private   $tab = null;

    /** @var EntityManager $em */
    protected $em;

    /** @var Application $app */
    protected $app;

    public $insertCallback = null;
    public $updateCallback = null;

    public function __construct(Application $app)
    {
        $this->em   = $app['orm.em'];
        $this->app  = $app;
    }

    public function getPriority()
    {
        return 0;
    }

    public function fromDatabase(Base $object, $entityName, $property, $flatten = false, $level = 0, $propertiesToLoad = array())
    {
        $getter = 'get'.ucfirst($property);

        return $object->$getter();
    }
    
    public function toDatabase(Api $api, Base $object, $property, $value, $entityName, $schema, $user, $data = null)
    {
        $setter = 'set'.ucfirst($property);
        $object->$setter($value);
    }

    public function renderJSON()
    {

    }

    public function getTab()
    {
        return $this->tab;
    }

    protected function addTab($key, $config){
        $this->tab = new \stdClass();
        $this->tab->key = $key;
        $this->tab->config = $config;
    }

    public function processSchema($key, $defaultValue, $propertyAnnotations, $entityName)
    {
        $schema = array(
            'label' => $key
        );

        $schema = array(
            'showInList' => false,
            'listShorten' => 0,
            'readonly' => false,
            'hide' => false,
            'type' => $this->getAlias(),
            'dbtype' => $this->getAlias(),
            'label' => $key,
            'filter' => '',
            'tab' => 'default',
            'sortable' => false,
            'default' => $defaultValue,
            'isFilterable' => false,
            'unique' => false,
            'encoded' => false
        );

        if(isset($propertyAnnotations['Areanet\\PIM\\Classes\\Annotations\\Config'])){


            //Areanet\\PIM\\Classes\\Annotations\\Config
            $annotations = $propertyAnnotations['Areanet\\PIM\\Classes\\Annotations\\Config'];

            if($annotations->encoded){
                $schema['encoded'] = $annotations->encoded;
            }

            if($annotations->label){
                $schema['label'] = $annotations->label;
            }

            if($annotations->unique){
                $schema['unique'] = $annotations->unique;
            }

            if($annotations->isFilterable){
                $schema['isFilterable'] = $annotations->isFilterable;
            }

            if($annotations->isDatalist){
                $schema['isDatalist'] = $annotations->isDatalist;
            }

            if($annotations->listShorten){
                $schema['listShorten'] = $annotations->listShorten;
            }

            if($annotations->showInList){
                $schema['showInList'] = $annotations->showInList;
            }

            if($annotations->hide){
                $schema['hide'] = $annotations->hide;
            }

            if($annotations->tab){
                $schema['tab'] = $annotations->tab;
            }

            if($annotations->readonly){
                $schema['readonly'] = $annotations->readonly;
            }


            //\Doctrine\ORM\Mapping\Column
            if(isset($propertyAnnotations['Doctrine\\ORM\\Mapping\\Column'])){
                $annotations = $propertyAnnotations['Doctrine\\ORM\\Mapping\\Column'];

                if($annotations->length){
                    $schema['length'] = $annotations->length;
                }

                if($annotations->unique){
                    $schema['unique'] = $annotations->unique;
                }

                if($annotations->type){
                    $schema['dbtype'] = $annotations->type;
                }

                $schema['nullable'] = $annotations->nullable ? $annotations->nullable : false;
            }


            //\Doctrine\ORM\Mapping\Id
            if(isset($propertyAnnotations['Doctrine\\ORM\\Mapping\\Id'])){
                $schema['readonly'] = true;
            }


        }

        return $schema;
    }

    abstract public function doMatch($propertyAnnotations);
    abstract public function getAlias();
    abstract public function getAnnotationFile();
    
}