<?php

$fixed = isset($_GET['cv_fixed']) ? $_GET['cv_fixed'] : null;
$message = isset($_GET['cv_message']) ? $_GET['cv_message'] : '';
$bgColour = isset($_GET['cv_background']) ? $_GET['cv_background'] : null;
$textColour = isset($_GET['cv_foreground']) ? $_GET['cv_foreground'] : null;
$linkColour = isset($_GET['cv_link_colour']) ? $_GET['cv_link_colour'] : null;
$linkURL = isset($_GET['cv_link_url']) ? $_GET['cv_link_url'] : '#';
$wrapLink = isset($_GET['cv_wrap_link']) ? $_GET['cv_wrap_link'] : false;
$linkText = isset($_GET['cv_link_text']) ? $_GET['cv_link_text'] : 'Read More';

?>

<div class="cv-banner">
    <?php if($wrapLink): ?><a href="<?php echo $linkURL ?>"><?php else: ?><span><?php endif; ?>
            <?php echo $message ?>
        <?php if($wrapLink): ?></a><?php else: ?></span> <a href="<?php echo $linkURL ?>"><?php echo $linkText ?></a><?php endif; ?>
    <span class="cv-close" data-timestamp="<?php echo time() ?>"></span>
</div>
<?php include('partials/styles/styles.php') ?>
<script>
    (function(){
        let cvBanner = document.querySelector('.cv-banner');
        let cvClose = cvBanner.querySelector('.cv-close');
        console.log("test");
        cvClose.onclick = function(){
            cvBanner.style.display = "none";
            document.cookie = "cvDismissed=" + cvClose.getAttribute('data-timestamp') + ";path=/";
        }
        var v = document.cookie.match('(^|;) ?cvDismissed=([^;]*)(;|$)');
        if((v ? v[2] : null) != cvClose.getAttribute('data-timestamp')){
            cvBanner.style.display = "block";
        }
        var value = "; " + document.cookie;
    })();
</script>