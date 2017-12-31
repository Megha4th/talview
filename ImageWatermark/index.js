exports.handler = (event, context, callback) => {
    var aws = require('aws-sdk');
	var ffmpeg = require('ffmpeg');
    var s3 = new aws.S3();
    // TODO implement
    console.log(event);
    
    var key = event.Records[0].s3.object.key;
   
    console.log(key);
   
   s3.getObject({Bucket:'meghaproject', Key:key},
      function(err,data) {
        if (err) {
           console.log('error getting object. Make sure they exist and your bucket is in the same region as this function.');
           context.done('error','error getting file'+err);
        }
        else {
           //console.log('CONTENT TYPE:',data.ContentType);
         
           var params = {Bucket: 'meghaproject', Key: key};
          var file = require('fs').createWriteStream('/tmp/test.mp4');
          file.on('close', function(){
         console.log('done');  //prints, file created
    });
  
		   try {
		     
				var process = new ffmpeg('/tmp/test.mp4');
				process.then(function (video) {
				console.log('The video is ready to be processed');
				var watermarkPath = 'flag-png-file.png',
				newFilepath = './video-com-watermark.mp4',
				settings = {
					position        : "SE"      // Position: NE NC NW SE SC SW C CE CW
        , margin_nord     : null      // Margin nord
        , margin_sud      : null      // Margin sud
        , margin_east     : null      // Margin east
        , margin_west     : null      // Margin west
      };
    var callback = function (error, files) {
      if(error){
        console.log('ERROR: ', error);
      }
      else{
        console.log('TERMINOU', files);
      }
    }
    //add watermark
    video.fnAddWatermark(watermarkPath, newFilepath, settings, callback)

  }, function (err) {
    console.log('Error: ' + err);
  });
} catch (e) {
  console.log(e.code);
  console.log(e.msg);
}
        }
      });
    
    
    callback(null, 'Hello from Lambda');
};