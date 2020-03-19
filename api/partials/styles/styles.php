<style>
    .cv-banner {
        <?php (isset($fixed) && $fixed) ? include('fixed.php') : include('static.php'); ?>
        display: none;
        font-size: 1em;
        box-sizing: border-box;
        text-align: center;
        font-weight: bold;
        width: 100%;
        padding: 15px 45px;
        color: <?php echo isset($textColour) ? $textColour : '#fff'; ?>;
        background: <?php echo isset($bgColour) ? $bgColour : '#f00'; ?>;
    }
    .cv-banner a {
        <?php if(isset($linkColour)): ?>color: <?php echo $linkColour; ?>;<?php endif; ?>
        <?php if(isset($wrapLink) && $wrapLink): ?>text-decoration: none;<?php endif; ?>
    }
    .cv-banner .cv-close {
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 15px;
        height: 1em;
        width: 1em;
        background: rgba(0,0,0,0.5);
        border-radius: 50%;
    }
    .cv-banner .cv-close::before {
        content: '';
        width: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        height: 2px;
        background: <?php echo isset($textColour) ? $textColour : '#fff'; ?>;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
    }
    .cv-banner .cv-close::after {
        content: '';
        width: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        height: 2px;
        background: <?php echo isset($textColour) ? $textColour : '#fff'; ?>;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
    }
</style>