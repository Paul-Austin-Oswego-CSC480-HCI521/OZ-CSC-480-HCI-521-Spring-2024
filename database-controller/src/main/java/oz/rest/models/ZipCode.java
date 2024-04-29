package oz.rest.models;

import org.bson.codecs.pojo.annotations.BsonProperty;

import jakarta.json.bind.annotation.JsonbAnnotation;
import jakarta.json.bind.annotation.JsonbCreator;
import jakarta.json.bind.annotation.JsonbProperty;


public class ZipCode extends AbstractModel{
    private String zipCode;
    
    public void setZipCode(String zipCode){
        this.zipCode = zipCode;
    }

    public String getZipCode(){
        return zipCode;
    }
}
